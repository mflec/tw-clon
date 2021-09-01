# Imitacion de twitter utilizando Nodejs

Registro de usuarios:
- Campos: Nombre completo, Correo electrónico, Nombre de usuario y
Contraseña.
- Modelo de datos que mantiene un registro de los inicios de sesión de los
usuarios.
- Monta una vista que permite el registro de los datos necesarios.
Login:
- Endpoint HTTP: POST /login para verifica si el usuario existe y si las
credenciales son válidas.
- Login que soporte el inicio de sesión utilizando el correo
electrónico o el nombre de usuario + contraseña.

Home:
- Endpoint HTTP: GET /home que requiere autenticación y lista hacia
abajo los tweets realizados por todos los usuarios.
- Redirecciona a esta vista al usuario al iniciar
sesión o registrarse correctamente (debe ser solo accesible a través de un inicio
de sesión válido).
- Endpoint HTTP: post /home para crear un tweet con un mensaje de
menos de 250 caracteres y crear un form para crear tweets y situarlo al principio
de la página.
- Modelo de datos para los Tweets, que mantiene un registro del usuario
creador del tweet, la fecha de creación y el mensaje.

Sin utilizar frameworks de CSS.
