const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('tweet', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(250),
            allowNull: false
        }
    }
    )
}