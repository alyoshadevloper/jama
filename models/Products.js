const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DbProduct = new Schema({
    name : {
        type : String
    },
    price : {
        type : String

    },
    select : {
        type : String

    },
    img : {
        type : String

    },
    textarea : {
        type : String
    },
    dirUser : String,
    UserName : String,
    Phone_number: String,
    director : {
        type : String
    }
})

module.exports = mongoose.model('Product' , DbProduct)