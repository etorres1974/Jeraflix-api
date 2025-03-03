// Criando Schema
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        
    },
    pass: {
        type: String,
        required: true,
        select: false
    },
    profiles: [{
        name: String,
        wishlist: Array,
        likes: Array
    }]
});
//Criando o modelo 
module.exports = mongoose.model('User', userSchema);