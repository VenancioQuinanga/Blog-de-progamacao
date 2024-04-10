const db = require('./db')

//sequelize.authenticate().then(()=>console.log('success')).catch((err)=>console.log('error'+err))

/*

const user = db.sequelize.define('users',{
    nome:{
        type:db.Sequelize.STRING
    },
    sobrenome:{
        type:db.Sequelize.STRING
    },
    idade:{
        type:db.Sequelize.INTEGER
    },
    email:{
        type:db.Sequelize.STRING
    }
})
*/

//user.create({ nome:"Davi",sobrenome:"Salomão",idade:20,email:"DaviS22@gmail.com"   })
/*
//user.sync({force:true})
*/

const posts = db.sequelize.define('posts',{
    titulo:{
        type:db.Sequelize.STRING
    },
    slug:{
        type:db.Sequelize.TEXT
    },
    descricao:{
        type:db.Sequelize.TEXT
    },
    conteudo:{
        type:db.Sequelize.TEXT
    },
    categoria:{
        type:db.Sequelize.INTEGER
    },
    date:{
        type:db.Sequelize.DATE
    }
})

module.exports = posts;