var express = require("express")
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
var port = process.env.PORT || 5000

app.use(express.static(__dirname))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

var dbUrl = 'mongodb+srv://mca:Passw0rd2021@mongo-node.suans.mongodb.net/mongo-node?retryWrites=true&w=majority'

var Message = mongoose.model('Message', {
    name: String,
    message: String,
    timestamp: String
})

/**
var messages = [
    {name: "John", message:"Hello"},
    {name: "Jane", message:"Hi"}
]
**/
/*
app.get('/messages', cors(), (req,res) =>{
    Message.find({}, (err,messages) =>  {
        res.send(messages)
    })
})
*/

app.get('/messages', cors(), (req,res) => {
    Message.find({}, (err,messages) => {
        res.send(messages)
        console.log('messages received successfully')
    })
})

app.post('/messages', cors(), (req,res) =>{
    var message = new Message(req.body)
    message.save((err) => {
//        if (err) 
//          sendStatus(500)
            io.emit('message',req.body)
            res.sendStatus(200)
            console.log('message posted successfully')
    })
})

io.on('connection', (socket) => {
    console.log(' user connected')
})

mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connection successful')
})

var server = http.listen(port, () => {
    console.log("Server is listening on port %d", port )
})


