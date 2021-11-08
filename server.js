var express = require("express")
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
var port = process.env.PORT || 5000
var cors = require('cors');

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());

var dbUrl = 'mongodb+srv://mca:Passw0rd2021@mongo-node.suans.mongodb.net/mongo-node?retryWrites=true&w=majority'

var Message = mongoose.model('Message', {
    name: String,
    message: String 
})

/**
var messages = [
    {name: "John", message:"Hello"},
    {name: "Jane", message:"Hi"}
]
**/

app.get('/messages',(req,res) =>{
    Message.find({}, (err,messages) =>  {
        res.send(messages)
    })
})

app.post('/messages',(req,res) =>{
    var message = new Message(req.body)
    message.save((err) => {
        if(err)
            res.sendStatus(500)
//  messages.push(req.body)
            io.emit('message',req.body)
            res.sendStatus(200)
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

