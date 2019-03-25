const router = require('express').Router();
const db = require('../Firebase').db;
const orderRef = db.collection('Order')
//route to signup
router.post('/createOrder', async (req, res) => {
    
    let userId = req.body.userId
    let products = req.body.products
    let amount = req.body.amount

    let ref = orderRef.doc()
    let order = {
        userId : userId,
        orderState : 'created',
        products : products,
        amount : amount
    }

    ref.set(order).then(() => {
        res.status(200).json({
            success : true,
            message : "Order Created"
        })
    }).catch(err => {
        res.status(500).json({
            success : false,
            message : "Order not created",
            error : err
        })
    })
    
})

router.get('/cancelOrder/:orderId', async (req, res) => {
    let orderId = req.params.orderId
    let ref = orderRef.doc(orderId)

    order = {
        orderState : 'cancelled'
    }

    ref.update(order).then(() => {
        res.status(200).json({
            success : true,
            message : "Order Cancelled"
        })
    }).catch(err => {
        res.status(500).json({
            success : false,
            message : "Something goes wrong",
            error : err
        })
    })
    
})

router.get('/checkStatus/:orderId', async (req, res) => {
    let orderId = req.params.orderId
    let ref = orderRef.doc(orderId)

    ref.get().then((doc) => {
        if(doc.exists){
            res.status(200).json({
                success : true,
                orderStatus : doc.data().orderState
            })
        }
    }).catch(err => {
        res.status(500).json({
            success : false,
            message : "Something goes wrong",
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