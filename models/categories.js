const db = require('./db')

const categories = db.sequelize.define('categories',{
    name:{
        type:db.Sequelize.STRING
    },
    slug:{
        type:db.Sequelize.TEXT
    },
    date:{
        type:db.Sequelize.DATE
    }
})

module.exports = categories;