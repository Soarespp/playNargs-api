const mongoose = require('mongoose');

const URL_LOCAL = "mongodb://localhost/nodejs";
const URL_ATLAS = "mongodb+srv://admin:admin@cluster0.z8gqt.mongodb.net/playnargs?retryWrites=true&w=majority"
const URL_ATLAS2 = "mongodb+srv://admin:admin@cluster0.ci0zz.mongodb.net/nodejs?retryWrites=true&w=majority"

class Connection {
    constructor() {
        this.dataBaseConnectionMongoDB();
    }

    dataBaseConnectionMongoDB() {
        this.mongoDBConnection = mongoose.connect(URL_ATLAS2) //cria essa database automatico
            .then(() => {
                console.log("Conexão estabelicida com o MongoDB");
            })
            .catch((error) => {
                console.log(`Erro ao estabelecer conexão com mongoDB: ${error}`)
            })
    }
}

module.exports = new Connection();