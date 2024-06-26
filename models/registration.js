'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class registration extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    registration.init({
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        address: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        password: DataTypes.STRING,
        cv: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'registration',
    });
    return registration;
};