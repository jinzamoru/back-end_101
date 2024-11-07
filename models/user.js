const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    user_email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    user_password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: "user"
}
)

module.exports = User;