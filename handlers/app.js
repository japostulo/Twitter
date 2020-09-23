const express = require('express')
const app = express()

// var io = require ( 'socket.io' )

var cors = require('cors')
app.use(express.json())
app.use(cors())
const port = 8000

const usersHandler = require('./users/usersHandler');
const tweetHandler = require('./tweet/tweetHandler');
const likesHandler = require('./likes/likesHandler');
const commentsHandler = require('./comments/commentsHandler');
const auth = require('./auth');

// io.on ( 'conexão' , (soquete) => { console .log ( 'um usuário conectado' ); });

// var bodyParser = require('body-parser')

// // create application/json parser
// var jsonParser = bodyParser.json()
 
// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: true })


//TWEET
app.get('/tweet', tweetHandler.get)
app.get('/tweet/:id', tweetHandler.getOne)
app.post('/tweet', tweetHandler.store)
app.delete('/tweet/:id', tweetHandler.delete)
app.patch('/tweet/:id', tweetHandler.update)


// const WebSocket = require('ws') 
// const wss = new WebSocket.Server({port: 8001})
// var clients=[];

// wss.on('connection', (ws) =>{
//     client = ws
//     clients.push(client)
    
//     console.log(`Novo usuário conectado`)

//     ws.on("message", (data) =>{
//         console.log(`Remover o post ${data}`)
//     })

//     ws.on("close", () =>{
//         console.log("Usuário desconectado")
//     })
// })

// function sendAll(message) {
//     clients.forEach(client =>{
//         client.send(message)
//     })
// }


// exports.sendAll = function(message) {
//     clients.forEach(client =>{
//         client.send(message)
//     })
// }

//USUÁRIOS
app.get('/users', usersHandler.get)
app.get('/users/:id', usersHandler.getOne)
app.post('/users', usersHandler.store)
app.delete('/users/:id', usersHandler.delete)


//LIKES
app.get('/likes', likesHandler.get)
app.get('/likes/:id', likesHandler.getOne)
app.post('/likes', likesHandler.store)
app.delete('/likes', likesHandler.delete)

// //COMMENTS
// app.get('/comments', commentsHandler.get)
// app.get('/comments/:id', commentsHandler.getOne)
// app.post('/comments', commentsHandler.store)
// app.delete('/comments/:id', commentsHandler.delete)

//AUTH
app.get("/auth", auth.get)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
