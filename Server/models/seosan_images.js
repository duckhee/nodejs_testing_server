'use strict';
module.exports = function(sequelize, DataTypes) {
  var seosan_images = sequelize.define('seosan_images', {
    si_title: DataTypes.STRING,
    si_path: DataTypes.STRING,
    si_filename: DataTypes.STRING,
    si_filesize: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return seosan_images;
};