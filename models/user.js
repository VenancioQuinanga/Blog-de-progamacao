const db = require('./db')

const user = db.sequelize.define('usuarios',{
    nome:{
        type:db.Sequelize.STRING
    },
    email:{
        type:db.Sequelize.STRING
    },
    isadmin:{
        type:db.Sequelize.INTEGER
    },
    senha:{
        type:db.Sequelize.TEXT
    }
})

//user.sync({force:true})

module.exports = user;