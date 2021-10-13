const {
    Router
} = require('express')
const router = Router()

router.get('/admin/',  (req, res) => {
    res.render('admin', {
        title: "Admin"
    })
})
router.post('/admin/',  (req, res) => {
    res.redirect('/')
})


module.exports = router