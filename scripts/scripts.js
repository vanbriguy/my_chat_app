/* global document,window,localStorage */

var socket = io()
$(()=> {
    $("#send").click(() => {
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
/*
// Personalized welcome message code

var nameButton = document.querySelector('.userName');
var myHeading = document.querySelector('.display-4');

$(document).ready(function() {
    function setUserName() {
        'use strict'
        var myName = window.prompt('Please enter your name.');
        localStorage.setItem('name', myName);
        myHeading.textContent = 'Have a nice day, ' + myName;
        }
    })

if (!localStorage.getItem('name')) {
            setUserName();
            }
    else {
        var storedName = localStorage.getItem('name');
        myHeading.textContent = 'Chatterbox = Welcome, ' + storedName;
        }

$(document).ready(function() {        
    nameButton.onclick = function () {
        'use strict'
        setUserName();
        console.log('button clicked');
        };
    })
*/