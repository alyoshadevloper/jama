const {Router} = require('express')
const router = Router()
const dbUser = require('../models/CreateAccount')
const dbProduct = require('../models/Products')

router.get('/account' , async(req , res) => {
    dbProduct.find({} , (err , data) => {
if(err){
    console.log(err);
}else{
    res.render('account' , {
        title: "Bosh sahifa",
        db : data
    })    
}
    })
})



module.exports = router 