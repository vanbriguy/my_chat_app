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
        if (JSON.parse(localStorage.getItem('psw_answr')) === JSON.parse(localStorage.getItem('password'))) {
        $("#messages").append(`<h4> From: ${message.name} </h4> <p> Message: ${message.message}</p> <p> Time: ${message.timestamp} </p><hr>`)
        } else enterPassword();
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

/*
    $(() => {
        $("#send").click(() => {
            // var password = {name: $("#yourPassword").text(), timestamp: new Date()}
            // postPassword(password)
        })
        getPasswords()
    })
*/

    $(() => {
        getPasswords()
    })
    socket.on('password',addPassword);


    function addPassword(password){
       // $("#yourPassword").replaceWith(`<h3 id="yourPassword">${password.name}</h3>`).text();
        localStorage.setItem('password', JSON.stringify(password.name));
        
    }

    function getPasswords() {
        $.get('/passwords', (data) => {
            data.forEach(addPassword)
        })
    }

    /**
    function postPassword(password) {
        $.post('/passwords', password )
        location.reload();
    }  
    **/  

//simple password check

var getStoredPasswordAnswer = JSON.parse(localStorage.getItem('psw_answr'));
var getStoredPassword = JSON.parse(localStorage.getItem('password'));


    var enterPassword = function() {

        var myPassword = window.prompt('Please enter the chat password');
        localStorage.setItem('psw_answr', JSON.stringify(myPassword));

//  function passwordCheck() {

        
    //    if (getStoredPasswordAnswer === getStoredPassword) {
        if (JSON.parse(localStorage.getItem('psw_answr')) === JSON.parse(localStorage.getItem('password'))) {
            alert('correct password, thank you');
            location.reload();
            } else {
                alert('Incorrect password, please try again');
                document.body.innerHTML = "";

                };
    };
    

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
            getPasswords();
            setTimeout(enterPassword(),2000); 
            setUserName();
            //passwordCheck();
            } else {
                var storedName = localStorage.getItem('name');
                $("#personalGreeting").append(`Welcome, <b> ${storedName} </b>`)
                $("#yourName").append(`${storedName}`)
                console.log(`${Date()}: "${storedName}" stored successfully`)
                var getStoredPassword = JSON.parse(localStorage.getItem('password'));
                $("#yourPassword").append(`${getStoredPassword}`);
                console.log(`${Date()}: "${getStoredPassword}" stored successfully`);
                }
    })

