const express = require('express')
const router = express.Router()

const userController = require('../controllers/user-controller')

//Lista Todas de users
router.get("/", userController.listarTodos)

//Busca por user pelo ID
router.get("/:id", userController.buscarPorId)

//Cadastro de users
router.post("/",  userController.cadastrar)

//Login
router.post("/login",  userController.login)

//Alteração de um User
router.put("/:id", userController.alterar)

//Exclusão de uma user pelo ID
router.delete("/:id", userController.deletar)

module.exports = router