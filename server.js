const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const http = require('http').Server(app)
const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json())

/* 
    ========== Local Server Config starts here ==========
    The messages will be stored until the server stops
    You can replace this section with the MongoDB Config section below for storing data in a database
*/
let messages = [
    { name: "Aaditya", message: "Hello There!"},
    { name: "Ram", message: "How are you all"},
    { name: "Krishna", message: "I'm fine"},
    { name: "Aaditya", message: "I'm fine too"},
]

app.get('/messages', (req, res) => {
    res.send(messages)    
})

app.get('/messages/:user', (req, res) => {
    let user = req.params.user;
    let filteredMsgs = messages.filter(msg => msg.name === user)
    res.send(filteredMsgs)
})

app.post('/messages', async(req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
})

/* ========== Local Server Config ends here ========== */

io.on('connection', socket => console.log('A user connected'))

let server = http.listen(3000, () => {
    console.log('Server is listening on port', server.address().port)
});


/* 
    ========== MongoDB Config starts here ==========
    Replace the Local Server Config above with the following section and fill 

const mongoose = require('mongoose'); // Keep this at the top section 
const dbUrl = "<Your mlab/MongoDB database URL>" // Fill the required value here

const Message = mongoose.model('Message', {
    name: String,
    message: String,
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => { res.send(messages) })
})

app.get('/messages/:user', (req, res) => {
    let user = req.params.user;
    Message.find({name: user}, (err, messages) => { res.send(messages) })
})

app.post('/messages', async(req, res) => {
    let message = new Message(req.body);
    try {
        let saved = await message.save();
        let censored = await Message.findOne({message: 'badword'})
        if(censored){
            return await Message.deleteOne({_id: censored.id});
        }
        io.emit('message', req.body);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        return console.error(error);
    }
})
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, err => {console.log("MongoDB connected", err)} )

    ========== MongoDB Config Ends here ==========
*/