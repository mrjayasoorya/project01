'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const OrderItems = sequelize.define('OrderItems', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'orders', // Table name to reference
        key: 'order_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'order_items',
    timestamps: true
  });

  OrderItems.associate = (models) => {
    OrderItems.belongsTo(models.Orders, {
      foreignKey: 'order_id',
      as: 'order'
    });
  };

  return OrderItems;
};

