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

    static async cadastrar(req, res) {
        try {
            await userModel.find({
                email: req.body.email
            }, async function (err, docs) {
                if (docs.length == 0) {
                    try{
                        await userModel.create(req.body)
                        res.json({value:"success", message:`Usuário cadastrado com sucesso`})
                    }catch(err){
                        res.send(err)
                    }
                    
                } else {
                    res.json({value:"error", message:"Error: Email já foi cadastrado"})

                }
            })
        } catch (error) {
            res.send(error)
        }


    }

    static login(req, res) {
        userModel.find({
            email: req.body.email,
            pass: req.body.pass
        }, function (err, docs) {
            if (docs.length == 0) {
                res.json({value:"error", message:"Error: email não cadastrado ou senha inválida"})
            } else {
                res.send({value:"success", message:`Usuário logado`})
            }
            if (err) {
                res.send(err)
            }
        })

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