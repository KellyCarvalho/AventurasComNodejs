
const Sequelize = require('sequelize');
const connection = require("./database");

Resposta = connection.define("respostas",{
    corpo: {
        type: Sequelize.TEXT,
        allowNull:false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force:false}).then(()=>{
    console.log('tabela criada');
});



module.exports = Resposta;