var socket = io()
$(()=> {
    $("#send").click(() => {
        // addMessages({name: $("#name").val(), message: $("#message").val()})
        var message = {name: $("#name").val(), message: $("#message").val(), timestamp: new Date()}
        postMessage(message)
    })
    getMessages()
})
socket.on('message',addMessage)

function addMessage(message){
        $("#messages").append(`<h4> Name: ${message.name} </h4> <p> Message: ${message.message}</p> <p> Time: ${message.timestamp} </p>`)
}

function getMessages() {
    $.get('/messages', (data) => {
        data.forEach(addMessage)
    })
}

function postMessage(message) {
    $.post('/messages', message )
    location.reload();
}