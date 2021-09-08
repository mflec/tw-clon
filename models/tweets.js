const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('tweet', {
        content: {
            type: DataTypes.STRING(250),
            allowNull: false
        }
    }
    )
}