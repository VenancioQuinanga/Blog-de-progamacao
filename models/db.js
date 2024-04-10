const Sequelize = require('sequelize')
const sequelize = new Sequelize('testb','root','',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = {
    sequelize,
    Sequelize
}
