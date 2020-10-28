var knex = require('../connection')
var pusher = require('../connectionPusher')
// , 'lastMessage.message as lt'
exports.get = (req, res) =>{ 
    // knex.select('chats.id as chat_id', 'name1.name as name1','name1.username as username1','name1.image as image1', 'name2.name as name2', 'name2.username as username2', 'name2.image as image2',)
    //     .from('chats')
    //     .innerJoin('user_chat', 'user_chat.chat_id', 'chats.id')
    //     .innerJoin('users as name1', 'user_chat.user_id', 'name1.id')
    //     .innerJoin('users as name2', 'user_chat.user_id2', 'name2.id')
    //     .leftJoin('messages as lastMessage', 'lastMessage.chat_id', 'chats.id')
    //     .where('name1.id', req.params.id)
    //     .orWhere('name2.id', req.params.id)

        knex.select('chats.id as chat_id', 
                    knex.raw(`if(user1.id != ${req.params.id},user1.id,user2.id) as user_id, if(user1.id !=${req.params.id},user1.name,user2.name) as user_name ,if(user1.id != ${req.params.id},user1.username,user2.username) as user_username, if(user1.id != ${req.params.id},user1.image,user2.image) as user_image`))
            .max('lastMessage.message as lastMessage')
            .from('chats')
            .innerJoin('user_chat', 'user_chat.chat_id', 'chats.id')
            .innerJoin('users as user1', 'user_chat.user_id', 'user1.id')
            .innerJoin('users as user2', 'user_chat.user_id2', 'user2.id')
            .leftJoin('messages as lastMessage', 'lastMessage.chat_id', 'user_chat.chat_id')
            .where('user1.id', req.params.id)
            .orWhere('user2.id', req.params.id)
            .groupBy('chats.id')

    .then((chats)=>{
        res.json({
            chats
        })
    })
}



exports.getMessages = (req, res)=>{
    knex.select('messages.id', 'messages.user_id as userId', 'userSend.name as userName', 'userSend.image as userImage', 'message', 'messages.message')
        .from('messages')
        .innerJoin('user_chat', 'messages.chat_id','user_chat.chat_id')
        .innerJoin('users as userSend', 'userSend.id', 'messages.user_id')
        .where('user_chat.chat_id', req.params.id)
        .orderBy('messages.id')
        // .limit('10')
        // .offset(`count(req.query.offset) - ${req.query.offset}`)
        .then((messages)=>{
            res.json({
                messages
            })
        })
        .catch(err =>{res.status(404).json({err})})
}

exports.sendMessage = (req, res) => {
    knex('messages')
        .insert({
            message: req.query.message,
            user_id: req.query.userId,
            chat_id: req.params.id,
        })
        .then((id)=>{
            let message = {
                id: id[0],
                message: req.query.message,
                user_id: req.query.userId,
                chat_id: req.params.id,
            }

            pusher.trigger('Messages', 'sendMessage', {
                message
            });

            res.json({
                message
            })
        })
        .catch(err =>{res.status(404).json({err})})
}


// select * from users
//     left join follows on follows.user_id = users.id
//     where follows.user_id = 1
            // ->select('messages.user_id as usuario enviando','message','messages.chat_id as para_chat')
            // ->join('user_chat','messages.chat_id','user_chat.chat_id')
            // ->where('user_chat.chat_id',$id)
            // ->orderBy('messages.id')
            // ->get();