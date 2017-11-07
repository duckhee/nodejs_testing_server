'use strict';
module.exports = function(sequelize, DataTypes) {
  var Value = sequelize.define('Value', {
    channel_name: DataTypes.STRING,
    vlaue_1: DataTypes.STRING,
    value_2: DataTypes.STRING,
    value_3: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Value;
};