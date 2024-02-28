const socket = io();
let user;
let chatBox = document.getElementById('chatBox');
let userBox = document.getElementById('userBox');
let log = document.getElementById('messageLogs');
Swal.fire({
    title: 'Login',
    input: 'text',
    text: 'Ingresa el usuario',
    inputValidator: (value) => {
        return !value && 'Ingrese un nombre'
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    userBox.innerHTML = `User: ${user}`
    socket.emit('login', user);
});

chatBox.addEventListener('keyup', (e) => {
    if(e.key === "Enter"){
        console.log('Mensaje enviado: ', {user: user, message: chatBox.value});
        socket.emit('message', {user: user, message: chatBox.value});
        chatBox.value = '';
    }
})

socket.on('messageLogs', (data) => {
    console.log(data);
    log.innerHTML = '';
    data.forEach(m => {
        log.innerHTML += `${m.user} says: ${m.message}<br/>`
    });
})

socket.on('notification', (data) => {
    Swal.fire({
        text: `${data} se ha conectado!`,
        toast: true,
        position: 'top-right'
    })
})