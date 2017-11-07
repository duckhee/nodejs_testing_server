'use strict';
module.exports = function(sequelize, DataTypes) {
  var File = sequelize.define('File', {
    file_name: DataTypes.STRING,
    file_folder: DataTypes.STRING,
    file_path: DataTypes.STRING,
    file_size: DataTypes.STRING,
    file_type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return File;
};