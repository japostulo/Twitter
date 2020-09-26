// Requires necessários
const express = require('express')
const app = express()
var cors = require('cors')

// CORS e Porta do Servidor
app.use(cors())
const port = 8000

const usersHandler = require('./users/usersHandler');
const tweetHandler = require('./tweet/tweetHandler');
const likesHandler = require('./likes/likesHandler');
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
app.get('/likes/:id', likesHandler.getOne)
app.post('/likes', likesHandler.store)
app.delete('/likes', likesHandler.delete)

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
