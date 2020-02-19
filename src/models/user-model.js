// Criando Schema
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true
    },
    senha: {
        type: String,
        required: true
    }
});
//Criando o modelo 
module.exports = mongoose.model('User', userSchema);