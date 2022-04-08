/* global document,window,localStorage */

var socket = io()

//trigger click get, add, post messages
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
            data.reverse().forEach(addMessage)
        })
    }

    function postMessage(message) {
        $.post('/messages', message )
        location.reload();
    }


//trigger add,get,post user

    $(() => {
        $("#send").click(() => {
            var user = {name: $('#yourName').text(), timestamp: new Date()}
            postUser(user)
        })
        getUsers()
    })
    socket.on('user',addUser)

    
    function addUser(user){
        $("#yourName").append(`User: ${storedName} `)
    }

    function getUsers() {
        $.get('/users', (data) => {
            data.forEach(addUser)
        })
    }

    function postUser(user) {
        $.post('/users', user )
        location.reload();
    }

//trigger add,get,post psw
var storedPassword = localStorage.getItem('password');

$(() => {
    $("#send").click(() => {
        var password = {name: $("#yourPassword").text(), timestamp: new Date()}
        postPassword(password)
    })
    getPasswords()
})
socket.on('password',addPassword)


function addPassword(password){
    $("#yourPassword").append(`Password: ${storedPassword} `)
}

function getPasswords() {
    $.get('/passwords', (data) => {
        data.forEach(addPassword)
    })
}

function postPassword(password) {
    $.post('/passwords', password )
    location.reload();
}    

//simple password check
    function enterPassword() {
        var myPassword = window.prompt('Please enter the chat password');
        localStorage.setItem('password', myPassword);
        $("#yourPassword").append(`${storedPassword}`);
        console.log(`${Date()}: "${storedPassword}" stored successfully`);
        location.reload();
        }

// create, change username
    function setUserName() {
        var myName = window.prompt('Please enter your name');
        localStorage.setItem('name', myName);
        location.reload();
        }

    $(() => {
        $("#userName").click(() => {
            setUserName()
            })
    })

    $(() => {
        if (!localStorage.getItem('name')) {
            enterPassword();
            setUserName();
            } else {
                var storedName = localStorage.getItem('name');
                $("#personalGreeting").append(`Welcome, <b> ${storedName} </b>`)
                $("#yourName").append(`${storedName}`)
                console.log(`${Date()}: "${storedName}" stored successfully`)
                }
    })

