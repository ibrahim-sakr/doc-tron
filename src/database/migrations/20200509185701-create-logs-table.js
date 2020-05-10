'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('logs', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            job_id: {
                allowNull: false,
                type: Sequelize.INTEGER.UNSIGNED
            },
            status: {
                allowNull: false,
                type: Sequelize.STRING
            },
            output: {
                allowNull: true,
                type: Sequelize.TEXT('medium')
            },
            error: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('logs');
    }
};
