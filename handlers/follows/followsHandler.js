const { select } = require('../connection')
var knex = require('../connection')
var pusher = require('../connectionPusher')

exports.getFollow = (req, res) =>{
    
    knex.select('fo.id as followId', 'f.id', 'f.name', 'f.username', 'f.image')
        .from('follows as fo')
        .innerJoin('users as u', 'u.id', 'fo.user_id')
        .innerJoin('users as f', 'f.id', 'fo.follow_id')
        .where('u.id', req.params.id)
        .then((follows)=>{
            res.json({
            follows
            })
        })
        .catch(err =>{res.status(404).json({err})})

    // select fo.id, u.id, u.name, f.id, f.name from follows as fo
    // inner join users as u on u.id = fo.user_id
    // inner join users as f on f.id = fo.follow_id
    // where u.id = 1

}

exports.getUnFollow = (req, res) =>{
    knex.select('u.id', 'u.name', 'u.username', 'u.image')
        .from('users as u')
        .leftJoin('follows as fo', 'fo.follow_id', 'u.id')
        .where('fo.user_id', '!=', '1')
        .orWhereNull('fo.user_id')
        .andWhere('u.id' , '!=', '1')
        .limit('3')
        .then((follows)=>{
            res.json({
                follows
            })
        })
        .catch(err =>{res.status(404).json({err})})

    // select * from users
    // left join follows on follows.follow_id = users.id
    // where follows.user_id != 1 or isnull(follows.user_id)
}

exports.store = (req, res) => {
    knex('follows')
        .insert({
            user_id: req.query.user_id,
            follow_id: req.query.follow_id
        })
    .then((follow) =>{
        res.json({
            follow
        })
    })
    .catch(err =>{res.status(404).json({err})})
}