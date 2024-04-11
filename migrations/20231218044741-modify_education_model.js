'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('registrations', 'phone', {
            type: Sequelize.STRING, // Change the data type to Sequelize.STRING
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('registrations', 'phone');
    }
};