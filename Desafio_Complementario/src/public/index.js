const socketClient = io()

//chat
const nombreUsuario = document.getElementById('nombreUsuario')
const formChat = document.getElementById('formChat')
const inputMensaje = document.getElementById('mensaje')
const chatParrafo = document.getElementById('chatParrafo')
let usuario = null


if(!usuario){
    Swal.fire({
        title: 'Bienvenido al chat',
        text:'Ingresa tu usuario',
        input: 'text', 
        inputValidator:(value)=>{
            if(!value){
                return 'Necesitas ingresar email'
            }
        }
    })
    .then(userName=>{
        usuario = userName.value
        nombreUsuario.innerText = usuario
    })
}


formulario.onsubmit = (e) =>{
    e.preventDefault()
    const info = {
        user: usuario, 
        message: inputMensaje.value
    }
    socketClient.emit('mensaje', info)
    inputMensaje.value = ''
}


socketClient.on('chat', mensajes=>{
    const htmlRender = mensajes.map(e=>{
        return `<p><strong>${e.user}: </strong>${e.message}</p>` 
          }).join(' ')

    chatParrafo.innerHTML = htmlRender
})