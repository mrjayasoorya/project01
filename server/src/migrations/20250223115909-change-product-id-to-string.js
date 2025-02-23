'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('order_items', 'product_id', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('order_items', 'product_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
