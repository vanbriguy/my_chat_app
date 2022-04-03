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
    


// user login
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
            setUserName();
            } else {
                var storedName = localStorage.getItem('name');
                $("#personalGreeting").append(`Welcome, <b> ${storedName} </b>`)
                $("#yourName").append(`${storedName}`)
                console.log(`${Date()}: "${storedName}" stored successfully`)
                }
    })

