'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('seosan_settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      st_serial: {
        type: Sequelize.STRING
      },
      st_address: {
        type: Sequelize.STRING
      },
      st_title: {
        type: Sequelize.STRING
      },
      st_gps: {
        type: Sequelize.STRING
      },
      st_group: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('seosan_settings');
  }
};