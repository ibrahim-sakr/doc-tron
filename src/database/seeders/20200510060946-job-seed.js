'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('jobs', [
            {
                name: 'John Doe',
                isBetaMember: false
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('jobs', null, {});
    }
};
