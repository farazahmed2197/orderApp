const router = require('express').Router();
const db = require('../Firebase').db;

//route to signup
router.post('/signup', async (req, res) => {
    let ref = db.collection('User').doc()
    let user =  {
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password
    }

    ref.set(user).then(() => {
        res.status(200).json({
            success : true,
            message : "User Added"
        })
    }).catch(err => {
        res.status(500).json({
            success : false,
            message : "user not added",
            error : err
        })
    })
    
})

// app.get('<Your Route>', function(req, res){
//     request('<API Call>', function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         var info = JSON.parse(body)
//         // do more stuff
//         res.send(info);
//       }
//     })
//   });

module.exports = router