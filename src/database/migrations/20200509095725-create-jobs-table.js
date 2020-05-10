'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      in_progress: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      queued: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      scheduled: {
        allowNull: false,
        type: Sequelize.STRING
      },
      next_run: {
        allowNull: false,
        type: Sequelize.DATE
      },
      args: {
        allowNull: false,
        type: Sequelize.JSON
      },
      worker: {
        allowNull: false,
        type: Sequelize.JSON
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
    return queryInterface.dropTable('jobs');
  }
};
