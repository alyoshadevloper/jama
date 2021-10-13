const {Router} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const DbUser = require("../models/CreateAccount")
const fileFilter = require('../middleware/fileUpload')
const {check , validationResult} = require('express-validator')


router.get('/registor/createAccount', (req, res) => {
    res.render('createAccount', {
        title: "Bosh sahifa",
        eUrl: req.url
    })
})
  
router.post('/registor/createAccount' , [
    check('your_name' , "Ismingizni kiriting" ).notEmpty(),
    check('login' , "Login kiriting" ).notEmpty(),
    check('password' , "Parolingizni kiriting" ).notEmpty(),
    check('phone' , "Telefoningizni kiriting" ).notEmpty(),
] ,  async (req , res) => {
    if(req.body.password){
        await check('password2' , "Parolingizni qaytadan kiriting" )
        .equals(req.body.password)
        .notEmpty()
        .run(req)
    }
    const errors = validationResult(req)                                            
    if(!errors.isEmpty()){
        res.render('createAccount' , {
            title : "Xatolik bor",
            errors : errors.array()
        })
    }else{
        try {
            const db =  new DbUser({
                your_name : req.body.your_name,
                login : req.body.login,
                password : req.body.password,
                phone : req.body.phone,
            })
            bcrypt.genSalt(10 , function (err , salt) {
                bcrypt.hash(db.password,salt,(err,hash)=>{
                    if(err){
                        throw err
                    }
                    db.password = hash
                    db.save((err) => {
                        if(err){
                            req.flash('danger' , "Bunday login bor")
                            res.redirect('/registor/createAccount')
                        }else{
                            req.flash('danger' , "Ro'yxatdan o'tdingiz")
                            res.redirect('/registor')
                        }
                    })
                })
                
              })
        } catch (error) {
            console.log(error);
        }
    }
})  


module.exports = router