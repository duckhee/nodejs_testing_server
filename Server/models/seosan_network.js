'use strict';
module.exports = function(sequelize, DataTypes) {
    var seosan_network = sequelize.define('seosan_network', {
        sn_serial: {
            type: DataTypes.STRING,
<<<<<<< HEAD
            unique: true
=======
            unique: true,
>>>>>>> won
        },
        sn_address: DataTypes.STRING,
        sn_type: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return seosan_network;
};