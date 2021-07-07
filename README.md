consigna:

El proyecto se puede realizar utilizando los siguientes frameworks:
- Nodejs – Javascript

Registro de usuarios:
- Campos necesarios: Nombre completo, Correo electrónico, Nombre de usuario y
Contraseña.
- Crear modelo de datos que mantenga un registro de los inicios de sesión de los
usuarios.
- Montar una vista que permita el registro de los datos necesarios.
Login:
- Implementar endpoint HTTP: POST /login para verificar si el usuario existe y las
credenciales son válidas.
- Crear página de Login que soporte el inicio de sesión utilizando el correo
electrónico o el nombre de usuario + contraseña.
Home:
- Implementar endpoint HTTP: GET /home que requiera autenticación y listar hacia
abajo los tweets realizados por todos los usuarios.
- Configurar como página de inicio y redireccionar a esta vista al usuario al iniciar
sesión o registrarse correctamente (debe ser solo accesible a través de un inicio
de sesión válido).
- Implementar endpoint HTTP: post /home para crear un tweet con un mensaje de
menos de 250 caracteres y crear un form para crear tweets y situarlo al principio
de la página.
- Crear modelo de datos para los Tweets, que mantenga un registro del usuario
creador del tweet, la fecha de creación y el mensaje.
Las páginas implementadas deben ser completamente responsivas, utilizar correctamente
los espacios y mantener un buen balance en la distribución de los elementos. NO se
permite utilizar frameworks de CSS (generar un archivo con los estilos y clases
necesarias en vanilla CSS o SCSS).
Se permite utilizar paquetes de cada framework para el sistema de autentificación (ej:
Laravel Sanctum), pero NO se permite utilizar starter kits (Laravel Breeze, Jetream).
