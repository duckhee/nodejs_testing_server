'use strict';
module.exports = function(sequelize, DataTypes) {
    var seosan_data = sequelize.define('seosan_data', {
        sd_address: DataTypes.STRING,
        sd_serial: DataTypes.STRING,
        sd_data: DataTypes.TEXT,
        createdAt: {
            allowNull: false,
            type: 'TIMESTAMP',
        },
        updatedAt: DataTypes.DATE
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return seosan_data;
};