const userModel = require("../models/user-model")
const ObjectId = require('mongoose').Types.ObjectId;

class userController {

    static async listarTodos(req, res) {
        let lista = await userModel.find({})
        res.json(lista)
    }

    static async buscarPorId(req, res) {
        let user = await userModel.findById({
            _id: req.params.id
        })
        res.json(user)
    }

    static cadastrar(req, res) {
        userModel.create(req.body)
        res.send(req.body.email + ' Cadastrado com sucesso')
    }

    static async alterar(req, res) {

        //Leitura dos dados em Json
        let id = req.body.id

        var cat = {
            descricao: req.body.descricao
        }

        await userModel.findByIdAndUpdate({
            _id: id
        }, cat)

        res.send('Alterado com sucesso ')

    }

    static async deletar(req, res) {
        const id = req.params.id;

        await userModel.deleteOne({
            _id: id
        })

        res.send('Deletado com sucesso')
    }
}

module.exports = userController