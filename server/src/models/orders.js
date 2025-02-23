'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    order_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'orders',
    timestamps: true
  });

  Orders.associate = (models) => {
    Orders.hasMany(models.OrderItems, {
      foreignKey: 'order_id',
      as: 'items'
    });
  };

  return Orders;
};
