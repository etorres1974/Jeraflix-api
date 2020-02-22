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
        console.log(req.body)
        try {// Verificar se o usuário ja existe
            await userModel.find({
                email: req.body.email
            }, async function (err, docs) {
                if (docs.length == 0) { //Se o email não estiver cadastrado o usuário não existe ainda
                    try{
                        await userModel.create(req.body)
                        res.json({value:"success", message:`Usuário cadastrado com sucesso`})
                    }catch(err){
                        res.send(err)
                    }
                    
                } else {// ja existe o usuário
                    res.json({value:"error", message:"Error: Email já foi cadastrado"})

                }
            })
        } catch (error) {
            res.send(error)
        }


    }

    static async  login(req, res) {
        userModel.find({
            email: req.body.email,
            pass: req.body.pass
        }, function (err, docs) {
            if (docs.length == 0) {
                res.json({value:"error", message:"Error: email não cadastrado ou senha inválida"})
            } else {
                res.send({value:"success", message:`Usuário logado`, user: docs})
            }
            if (err) {
                res.send(err)
            }
        })

    }

    static async deletar(req, res) {
        const id = req.params.id;

        await userModel.deleteOne({
            _id: id
        })

        res.send('Deletado com sucesso')
    }

    static async alterar(req, res) {
        console.log(req.body)
            userModel.findById(req.params.id , function (err,doc){
                if(err){
                    res.send(err)
                }
                doc.profiles.push(req.body)
                res.send(doc.save())
                
            })
    }

    static async favoritar(req, res) {
            userModel.findById(req.params.id , function (err,doc){
                if(err){
                    res.send(err)
                }
                doc.profiles.forEach(profile => {
                    if(profile._id == req.body.profileId){
                        profile.wishlist.push(req.body.movie)
                    }
                })
                res.send(doc.save())
            })
    }
}

module.exports = userController