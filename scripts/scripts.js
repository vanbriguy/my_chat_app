/* global document,window,localStorage */

var socket = io()


socket.on('message',addMessage);
socket.on('user',addUser);
socket.on('password',addPassword);

//-- ADD, GET, POST MESSAGE(S) 
    function addMessage(message){
        if (JSON.parse(localStorage.getItem('psw_answr')) === JSON.parse(localStorage.getItem('password'))) {
        $("#messages").append(`<h4> From: ${message.name} </h4> <p> Message: ${message.message}</p> <p> Time: ${message.timestamp} </p><hr>`)
        } else 
            enterPassword();
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

//-- ADD, GET, POST USER
    function addUser(user){
        $("#yourName").append(`User: ${storedName}`)
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

//-- ADD, GET, POST PASSWORD
    $(() => {
        getPasswords();
        addPassword();
    });

    function addPassword(password){
        localStorage.setItem('password', JSON.stringify(password.name));
        
    };

    function getPasswords() {
        $.get('/passwords', (data) => {
            data.forEach(addPassword)
        })
    };

    /**
    function postPassword(password) {
        $.post('/passwords', password )
        location.reload();
    }  
    **/  

//-- SIMPLE PASSWORD CHECK
    var getStoredPasswordAnswer = JSON.parse(localStorage.getItem('psw_answr'));
    var getStoredPassword = JSON.parse(localStorage.getItem('password'));

    function enterPassword () {
        var myPassword = window.prompt('Please enter the chat password');
        localStorage.setItem('psw_answr', JSON.stringify(myPassword));
        setTimeout(() => {passwordCheck()},1000);
    };

    function passwordCheck() {
        if (JSON.parse(localStorage.getItem('psw_answr')) === JSON.parse(localStorage.getItem('password'))) {
            correctPasswordResponse();
            } else {
                incorrectPasswordResponse();
                };
    };

    function correctPasswordResponse() {
        alert('correct password, thank you');
        //console.log(`${Date()}: "${getStoredPasswordAnswer}" correct password entered`);
        location.reload();
    };

    function incorrectPasswordResponse() {
        alert('Incorrect password, please try again');
        //console.log(`${Date()}: "${getStoredPasswordAnswer}" incorrect password entered`);
        document.body.innerHTML = "";
        enterPassword();
    };
    

//-- SET, UPDATE USERNAME
    function setUserName() {
        var myName = window.prompt('Please enter your name');
        localStorage.setItem('name', myName);
        enterPassword();
        //location.reload();
        }

    function updateUserName() {
        var storedName = localStorage.getItem('name');
        $("#personalGreeting").append(`Welcome, <b> ${storedName} </b>`);
        $("#yourName").append(`${storedName}`);
        console.log(`${Date()}: "${storedName}" stored successfully`);
        //var getStoredPassword = JSON.parse(localStorage.getItem('password'));
        //$("#yourPassword").append(`${getStoredPassword}`);
        console.log(`${Date()}: "${getStoredPasswordAnswer}" stored successfully`);
    }


//-- TRIGGER USERNAME AND PASSWORD
    $(() => {
        $("#send").click(() => {
            if (!localStorage.getItem('name')) {
                setUserName();
            } else {
                var message = {name: $('#yourName').text(), message: $("#message").val(), timestamp: new Date()};
                postMessage(message);

                var user = {name: $('#yourName').text(), timestamp: new Date()};
                postUser(user);
            }
        })
        getMessages()
        getUsers()
    })



    $(() => {
        $("#userName").click(() => {
            setUserName()
            })
    });

//-- ON PAGE LOAD

    $(() => {
        if (!localStorage.getItem('name')) {
            setUserName(); 
            } else {
                updateUserName();
                }
    }); 