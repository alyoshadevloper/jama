const {Router} = require('express')
const router = Router()
const dbUser = require('../models/CreateAccount')
const dbProduct = require('../models/Products')

router.get('/', async (req, res) => {
    dbProduct.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: "Bosh sahifa",
                db: data
            })
        }
    })
})


module.exports = router