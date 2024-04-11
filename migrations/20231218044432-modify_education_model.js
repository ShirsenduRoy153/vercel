'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn('registrations', 'phone');
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.addColumn('registrations', 'phone', {
            type: Sequelize.STRING,
        });
    },
};