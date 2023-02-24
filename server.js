
var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var port = process.env.PORT || 5000;


app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

var dbUrl = 'mongodb+srv://mca:YA6BoMryaqEHy6G2@mongo-node.suans.mongodb.net/mongo-node?retryWrites=true&w=majority'
//'mongodb+srv://mca:YA6BoMryaqEHy6G2@mongo-node.suans.mongodb.net/?retryWrites=true&w=majority'

//fixie:KMDtBYBwMO92Zng@speedway.usefixie.com:1080

//-- Message model for mongodb
var Message = mongoose.model('Message', {
    name: String,
    message: String,
    timestamp: String
})

//-- User model for mongodb
var User = mongoose.model('User', {
    name: String,
    timestamp: String
})

//-- Password model for mongodb
var Password = mongoose.model('Password', {
    name: String,
    timestamp: String
})


//-- get messages from mongodb
app.get('/messages', cors(), (req,res) => {
    Message.find({}, (error,messages) => {
        res.send(messages)
        console.log(`${Date()}: messages received successfully`)
    })
})

//-- get users from mongodb
app.get('/users', cors(), (req,res) => {
    User.find({}, (error,users) => {
        res.send(users)
        console.log(`${Date()}: users received successfully`)
    })
})

//-- get passwords from mongodb
app.get('/passwords', cors(), (req,res) => {
    Password.find({}, (error,passwords) => {
        res.send(passwords)
        console.log(`${Date()}: passwords received successfully`)
    })
})

//-- post messages to mongodb
app.post('/messages', (req,res) =>{
    var message = new Message(req.body)
    message.save((error) => {
        if (error) 
            console.log(error)
            else {
                io.emit('message',req.body)
                res.sendStatus(200)
                console.log(`${Date()}: message "${message.message}" posted successfully`);
                }
    })
})

//-- post users to mongodb
app.post('/users', cors(), (req,res) =>{
    var user = new User(req.body)
    user.save((error) => {
        if (error) 
            console.log(error) 
            else {
                io.emit('user',req.body)
                res.sendStatus(200)
                console.log(`${Date()}: user "${user.name}" posted successfully`);
                }
    })
})

//-- post passwords to mongodb
app.post('/passwords', cors(), (req,res) =>{
    var password = new Password(req.body)
    password.save((error) => {
        if (error) 
            console.log(error) 
            else {
                io.emit('password',req.body)
                res.sendStatus(200)
                console.log(`${Date()}: password "${password.name}" posted successfully`);
                }
    })
})

io.on('connection', (socket) => {
    console.log(`${Date()}: user connected`)
})

mongoose.connect(dbUrl, (error) => {
    console.log(`${Date()}: mongodb connection successful`)
})

var server = http.listen(port, () => {
    console.log(`${Date()}: Server is listening on port ${port}` )
})