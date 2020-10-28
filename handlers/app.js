// Requires necessários
const express = require('express')
var session = require('express-session')
var cors = require('cors')

const app = express()



// CORS e Porta do Servidor
app.use(cors())

app.use(session({
    secret: 'sessionSecret',
    resave: true,
    saveUninitialized: true
}))

const port = 8000

const usersHandler = require('./users/usersHandler');
const tweetHandler = require('./tweet/tweetHandler');
const likesHandler = require('./likes/likesHandler');
const chatsHandler = require('./chats/chatsHandler');
const followsHandler = require('./follows/followsHandler');
const commentsHandler = require('./comments/commentsHandler');
const auth = require('./auth');



//TABLE TWEET CRUD
app.get('/tweet', tweetHandler.get)
app.get('/tweet/:id', tweetHandler.getOne)
app.post('/tweet', tweetHandler.store)
app.delete('/tweet/:id', tweetHandler.delete)
app.patch('/tweet', tweetHandler.update)

//TABLE USUÁRIOS CRUD
app.get('/users', usersHandler.get)
app.get('/users/:id', usersHandler.getOne)
app.post('/users', usersHandler.store)
app.delete('/users/:id', usersHandler.delete)


//TABLE LIKES CRUD
app.get('/likes', likesHandler.get)
app.get('/likes/:id', likesHandler.getUserLike)
// app.get('/likes/:id', likesHandler.getOne)
app.post('/likes', likesHandler.store)
app.delete('/likes', likesHandler.delete)

//TABLE LIKES CRUD
app.get('/chats/user/:id', chatsHandler.get)
app.get('/chats/:id/messages', chatsHandler.getMessages)
app.post('/chats/:id/messages', chatsHandler.sendMessage)

//TABLE FOLLOWS
app.get('/follow/:id', followsHandler.getFollow)
app.get('/Unfollow/:id', followsHandler.getUnFollow)
app.post('/follows', followsHandler.store)





// // TABLE COMMENTS CRUD
// app.get('/comments', commentsHandler.get)
// app.get('/comments/:id', commentsHandler.getOne)
// app.post('/comments', commentsHandler.store)
// app.delete('/comments/:id', commentsHandler.delete)

//MÉTODO AUTH
app.get("/auth", auth.get)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
