document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById('formularioUsuario');
    const nombreUsuario = document.getElementById('nombreUsuario');
    const planta = document.getElementById('planta');
    const departamento = document.getElementById('departamento');
    const correo = document.getElementById('correo');
    const pass = document.getElementById('pass');
    const confirmarPass = document.getElementById('confirmarPass');
    const listaUsuarios = document.getElementById('listaUsuarios');
    let usuarios = [];

    const departamentos = {
        "1": ["Contabilidad", "Personal"],
        "2": ["Informática", "Ingeniería"]
    };

    planta.addEventListener('change', () => {
        const plantaSeleccionada = planta.value;
        departamento.innerHTML = '<option value="">Seleccione un departamento</option>';
        if (departamentos[plantaSeleccionada]) {
            departamentos[plantaSeleccionada].forEach(depto => {
                const opcion = document.createElement('option');
                opcion.value = depto;
                opcion.textContent = depto;
                departamento.appendChild(opcion);
            });
        }
    });

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            const nuevoUsuario = {
                id: generarId(),
                nombreUsuario: nombreUsuario.value,
                planta: planta.options[planta.selectedIndex].text,
                departamento: departamento.value,
                correo: correo.value
            };
            insertarUsuario(nuevoUsuario);
            //usuarios.concat(nuevoUsuario);
            formulario.reset(); 
        }
    });

    function generarId() {
        return Math.random().toString(36).substr(2, 9);
    }

    function insertarUsuario(usuario) {
        usuarios[usuario.id] = usuario;

        const fila = listaUsuarios.insertRow();
        fila.setAttribute('id', `usuario-${usuario.id}`);
        fila.insertCell().textContent = usuario.id;
        fila.insertCell().textContent = usuario.nombreUsuario;
        fila.insertCell().textContent = usuario.planta;
        fila.insertCell().textContent = usuario.departamento;
        fila.insertCell().textContent = usuario.correo;
        const celdaAcciones = fila.insertCell();

        const botonEditar = document.createElement('button');
        botonEditar.innerHTML = '<i class="fas fa-edit"></i>';
        botonEditar.classList.add('btn', 'btn-warning');
        botonEditar.onclick = function() { editarUsuario(usuario.id); };

        const botonBorrar = document.createElement('button');
        botonBorrar.innerHTML = '<i class="fas fa-trash-alt"></i>';
        botonBorrar.classList.add('btn', 'btn-danger');
        botonBorrar.onclick = function() { 
            if (confirm('¿Está seguro de que desea borrar este usuario?')) {
                borrarUsuario(usuario.id); 
            }
        };

        celdaAcciones.appendChild(botonEditar);
        celdaAcciones.appendChild(botonBorrar);
    }

    function validarFormulario() {
        if(nombreUsuario.value.length < 3 || nombreUsuario.value.includes(" ")){
            alert('Nombre de usuario incorrecto. Debe tener más de tres caracteres y sin espacios')
            return false;
        } else if (pass.value !== confirmarPass.value) {
            alert('Las contraseñas no coinciden. Por favor, verifica e intenta de nuevo.');
            return false;
        }
        return true;
    }

    function editarUsuario(idUsuario) {

        const usuario = usuarios[idUsuario];
        console.log(usuario);
        nombreUsuario.value = usuario.nombreUsuario;
        planta.value = usuario.planta === "Planta 1" ? "1" : "2";
        //planta.value = usuario.planta; 

        departamento.innerHTML = ''; 
        departamentos[planta.value].forEach(depto => {
            const opcion = document.createElement('option');
            opcion.value = depto;
            opcion.textContent = depto;
            departamento.appendChild(opcion);
        });
        departamento.value = usuario.departamento;
        correo.value = usuario.correo;
        pass.value = '';
        confirmarPass.value = '';
    }

    function borrarUsuario(idUsuario) {
        delete usuarios[idUsuario];
        const fila = document.getElementById(`usuario-${idUsuario}`);
        fila.remove()
    }
});

