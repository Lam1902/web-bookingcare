


const Sequelize = require('sequelize');
const sequelizeInstance = new Sequelize('csdl_test', 'root', null, {

    host: 'localhost',
    dialect: 'mysql',
    logging: false

})

let connectDB = async () => {
    try {
        await sequelizeInstance.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = connectDB 