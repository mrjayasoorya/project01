'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('master_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      _id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true
      },
      actual_price: {
        type: Sequelize.STRING
      },
      average_rating: {
        type: Sequelize.FLOAT
      },
      brand: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      crawled_at: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.TEXT
      },
      discount: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.JSON
      },
      out_of_stock: {
        type: Sequelize.BOOLEAN
      },
      pid: {
        type: Sequelize.STRING
      },
      product_details: {
        type: Sequelize.JSON
      },
      seller: {
        type: Sequelize.STRING
      },
      selling_price: {
        type: Sequelize.STRING
      },
      sub_category: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('master_products');
  }
};
