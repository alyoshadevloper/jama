const {Router} = require('express')
const DbProduct = require('../models/Products')
const fileFilter = require('../middleware/fileUpload')
const user = require('../models/CreateAccount')
const toDelete = require('../middleware/delete')
const router = Router()

router.get('/account/add', (req, res) => {
    res.render('add', {
        title: "Bosh sahifa",
    })
})

router.post('/account/add', fileFilter.single('img'), async (req, res) => {
    const img = req.file.filename
    const db = new DbProduct({
        name: req.body.name,
        price: req.body.price,
        select: req.body.select,
        img,
        textarea: req.body.textarea,
        dirUser : req.user.id,
        UserName : req.user.your_name,
        Phone_number : req.user.phone,
    })
    await db.save()
    res.redirect('/account')
})

router.get('/account/logout', (req, res) => {
    req.logout()
    req.flash("success", "Chiqib ketdingiz")
    res.redirect('/')
})

router.get('/account/product_more/:id', (req, res) => {
    DbProduct.findById(req.params.id, (err, data) => {
        if (err) {
            console.log(err);            
        } else {
            res.render('more', {
                title: "Batafsil",
                db : data
            })
        }
    })
})


router.get('/account/product_delete/:id' , async (req , res) => {
    const {img} = await DbProduct.findById(req.params.id)
    toDelete(img)
    await DbProduct.findByIdAndDelete(req.params.id , (err , data) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/')
        }
    })
})

router.get('/account/product_update/:id' , (req , res) => {
    
    DbProduct.findById(req.params.id , (err , data) => {
        if(err){
            console.log(err);
        }else{
            res.render('update' , {
                db : data
            })           
        }
    })
})

router.post('/account/product_update/:id', fileFilter.single('img'), (req , res) => {
    const updateDb = {}
    updateDb.name = req.body.name,
    updateDb.price = req.body.price,
    updateDb.img = req.file.filename
    updateDb.textarea = req.body.textarea
    const userId = {_id : req.params.id}
    DbProduct.updateOne(userId , updateDb , (err) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/')
        }
    })
})




module.exports = router