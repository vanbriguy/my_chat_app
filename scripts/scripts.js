/* global document,window,localStorage */

var socket = io()
$(() => {
    $("#send").click(() => {
        var message = {name: $('#yourName').text(), message: $("#message").val(), timestamp: new Date()}
        postMessage(message)
    })
    getMessages()
})
socket.on('message',addMessage)

function addMessage(message){
        $("#messages").append(`<h4> From: ${message.name} </h4> <p> Message: ${message.message}</p> <p> Time: ${message.timestamp} </p><hr>`)
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

// user login code
function setUserName() {
    var myName = window.prompt('Please enter your name');
    localStorage.setItem('name', myName);
    location.reload();
 //   $("#personalGreeting").append(`: Welcome, ${myName}`);
    }

$(() => {
    $("#userName").click(() => {
        setUserName()
        })
})

$(() => {
    if (!localStorage.getItem('name')) {
        setUserName();
        } else {
            var storedName = localStorage.getItem('name');
            $("#personalGreeting").append(`: Welcome, ${storedName}`)
            $("#yourName").append(`${storedName}`)
            }
})

