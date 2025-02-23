'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      order_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      user_id: {
        type: Sequelize.UUID, // Assuming user IDs are UUIDs
        allowNull: false
      },
      total_amount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      order_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('orders');
  }
};
