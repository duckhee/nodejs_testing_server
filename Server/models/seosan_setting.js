'use strict';
module.exports = function(sequelize, DataTypes) {
    var seosan_setting = sequelize.define('seosan_setting', {
        st_serial: DataTypes.STRING,
        st_address: DataTypes.STRING,
        st_title: DataTypes.STRING,
        st_gps: DataTypes.STRING,
        st_ping: DataTypes.INTEGER,
        st_group: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return seosan_setting;
};