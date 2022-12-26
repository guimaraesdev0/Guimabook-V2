const Sequelize = require("sequelize"); // S maisculo para importar o pacote

const db_guimabook = new Sequelize('guimabook', 'root', '', { // s minusculo para referenciar o banco de dados
    host: 'localhost',
    dialect: 'mysql'
});

module.exports={
    Sequelize: Sequelize,
    db_guimabook: db_guimabook
}