/* global document,window,localStorage */

var socket = io()

//-- get, add, post messages
    
    function addMessage(message){
        if (JSON.parse(localStorage.getItem('psw_answr')) === JSON.parse(localStorage.getItem('password'))) {
        $("#messages").append(`<h4> From: ${message.name} </h4> <p> Message: ${message.message}</p> <p> Time: ${message.timestamp} </p><hr>`)
        } else 
            enterPassword();
            //setUserName();
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


//-- add, get, post user
    
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

//-- add, get, post psw

    $(() => {
        getPasswords();
        addPassword();
    });

    socket.on('password',addPassword);


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

//-- simple password check

    var getStoredPasswordAnswer = JSON.parse(localStorage.getItem('psw_answr'));
    var getStoredPassword = JSON.parse(localStorage.getItem('password'));


    function enterPassword () {

        var myPassword = window.prompt('Please enter the chat password');
        localStorage.setItem('psw_answr', JSON.stringify(myPassword));
        setTimeout(passwordCheck(),1000);
    };

    function passwordCheck() {
        if (JSON.parse(localStorage.getItem('psw_answr')) === JSON.parse(localStorage.getItem('password'))) {
            alert('correct password, thank you');
            console.log(`${Date()}: "${getStoredPasswordAnswer}" correct password entered`);
            setUserName();
            } else {
                alert('Incorrect password, please try again');
                console.log(`${Date()}: "${getStoredPasswordAnswer}" incorrect password entered`);
                document.body.innerHTML = "";
                enterPassword;
                };
        }



//-- Set, change username
    function setUserName() {
        var myName = window.prompt('Please enter your name');
        localStorage.setItem('name', myName);
        location.reload();
        }

    $(() => {
        if (!localStorage.getItem('name')) {
            getPasswords();
            setTimeout(enterPassword(),2000);
            setTimeout(setUserName(),3000); 
            } else {
                var storedName = localStorage.getItem('name');
                $("#personalGreeting").append(`Welcome, <b> ${storedName} </b>`);
                $("#yourName").append(`${storedName}`);
                console.log(`${Date()}: "${storedName}" stored successfully`);
                //var getStoredPassword = JSON.parse(localStorage.getItem('password'));
                //$("#yourPassword").append(`${getStoredPassword}`);
                console.log(`${Date()}: "${getStoredPasswordAnswer}" stored successfully`);
                }
    });

//-- trigger username and password
    $(() => {
        $("#send").click(() => {
            var message = {name: $('#yourName').text(), message: $("#message").val(), timestamp: new Date()};
            postMessage(message);
            var user = {name: $('#yourName').text(), timestamp: new Date()};
            postUser(user);
        })
        getMessages()
        getUsers()
    })
    socket.on('message',addMessage)
    socket.on('user',addUser)
  

    $(() => {
        $("#userName").click(() => {
            setUserName()
            })
    });

 /**   
    $(() => {
        $("#send").click(() => {
            var message = {name: $('#yourName').text(), message: $("#message").val(), timestamp: new Date()}
            postMessage(message)
        })
        getMessages()
    })
    socket.on('message',addMessage)


    $(() => {
        $("#send").click(() => {
            var user = {name: $('#yourName').text(), timestamp: new Date()}
            postUser(user)
        })
        getUsers()
    })
    socket.on('user',addUser)

    $(() => {
        $("#userName").click(() => {
            setUserName()
            })
    });
**/