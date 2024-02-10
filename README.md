# recuperacion-1t

Comentario:

Manu, muy buen ejercicio en líneas generales. Has cumplido con todos los requerimientos del problema salvo por un par de detalles. Te los comento:
- No se distingue la funcionalidad de "editar" de la de "crear" un registro. Esto hace que el resultado después editar no sea el previsto. Tendrías que haber usado una variable que detectara si estás editando o estás creando un nuevo usuario y así manejar el registro en la tabla convenientemente
- Mezclas, como no puede ser de otro modo, validación HTML5 con validación JS personalizada para comprobar la coincidencia de las claves. Cuando esto te pase tienes que ser más homogéneo en los mensajes al usuario. No que del todo bien mezclar alert y validación nativa del navegador. Tienes que jugar con Bootstrap, por ejemplo, que permite unificar los mensajes. O hacer completamente una validación personalizada por JS.

Por lo demás muy buen trabajo. Felicidades.
