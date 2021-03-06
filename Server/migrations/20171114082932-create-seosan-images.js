'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('seosan_images', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            si_serial: {
                type: Sequelize.STRING
            },
            si_path: {
                type: Sequelize.STRING
            },
            si_filename: {
                type: Sequelize.STRING
            },
            si_filesize: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('seosan_images');
    }
};