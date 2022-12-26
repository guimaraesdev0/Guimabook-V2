const db = require("./db");
const tb_User = require("./UserModel")



const tb_Post = db.db_guimabook.define('tb_Post',{
    Post_Content: {
    type: db.Sequelize.STRING,
    }
})

tb_User.hasMany(tb_Post)
tb_Post.belongsTo(tb_User, { foreignKey: 'tbUserId', as: 'author' });


const GetAllPosts = () => {
    return tb_Post.findAll({
        include: [{
        model: tb_User,
        as: 'author'
      }],

      order : [
        ['createdAt', 'DESC']
      ]
    }).then((posts) => {
        return posts.map((post) => {
          return {
            authorid: post.author.id,
            authorimg: post.author.User_Img,
            authorname: post.author.User_FirstName + " " + post.author.User_LastName,
            postcontent: post.Post_Content
          }

        })
      })
      .catch((err) => {
        return err
      })
}



//criar tabela, executar apenas uma vez, depois comentar para não criar mais uma vez
//tb_Post.sync({force: true})     

module.exports = {tb_Post, GetAllPosts}

