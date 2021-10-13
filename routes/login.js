const {Router} = require('express')
const router = Router()
const bcryptjs = require('bcryptjs')
const DbUser_search = require('../models/CreateAccount')
const passport = require('passport')

router.get('/registor', async (req, res) => {
            res.render('registor', {
                title: "ro'yxatdan o'tish"
            })
})

router.post('/registor', async (req, res , next) => {
     passport.authenticate('local' , {
        successRedirect : "/account",
        failureRedirect : "/registor",
        successFlash : "Xush kelibsiz",
        failureFlash : 'Error',
    })(req , res , next)
})



module.exports = router
