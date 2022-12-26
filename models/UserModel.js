const db = require("./db");

const tb_User = db.db_guimabook.define('tb_User',{
    User_Token:{
    type: db.Sequelize.STRING,
    },
    User_FirstName: {
    type: db.Sequelize.STRING,
    },
    User_LastName: {
        type: db.Sequelize.STRING,
    },
    User_Email:{
    type: db.Sequelize.STRING,
    },
    User_Password:{
    type: db.Sequelize.STRING,
    },
    User_Description:{
    type: db.Sequelize.STRING,  
    defaultValue: "Hello, I'm using GuimaBook",
    },
    User_Img:{
    type: db.Sequelize.STRING,  
    defaultValue: "default.jpg",
    },
    User_Nasc:{
    type: db.Sequelize.DATE,  
    },
    User_Gender:{
        type: db.Sequelize.INTEGER,
    },
    eAdmin:{
    type: db.Sequelize.INTEGER,
    defaultValue: "0",
    }
})

//criar tabela, executar apenas uma vez, depois comentar para não criar mais uma vez
//tb_User.sync({force: true})  

module.exports = tb_User