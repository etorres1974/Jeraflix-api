require('dotenv/config');
const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require('./src/routes/user-routes')
const PORT = process.env.PORT || 5000 

app.use(cors())
app.use(express.json())
app.use('/user', userRoutes)

//Conectando com Mongodb
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true ,
    dbName: "Users-filmes"
}
const MongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mycluster-sbfan.gcp.mongodb.net/test?retryWrites=true&w=majority`
const mongoose = require('mongoose');
      mongoose.connect(MongoUrl,options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Conectado com sucesso no Mongo")
});


app.use("/", (req, res) => {
    res.send("Esta é a raiz da aplicação")
})

app.listen(PORT, () => console.log('Api rodando na porta -> ' + PORT))