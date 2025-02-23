'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      avg_session_length: {
        type: Sequelize.FLOAT
      },
      time_on_app: {
        type: Sequelize.FLOAT
      },
      time_on_website: {
        type: Sequelize.FLOAT
      },
      length_of_membership: {
        type: Sequelize.FLOAT
      },
      yearly_amount_spent: {
        type: Sequelize.FLOAT
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Customers');
  }
};