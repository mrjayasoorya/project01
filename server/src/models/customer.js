'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {}
  Customer.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      address: DataTypes.STRING,
      avatar: DataTypes.STRING,
      avg_session_length: DataTypes.FLOAT,
      time_on_app: DataTypes.FLOAT,
      time_on_website: DataTypes.FLOAT,
      length_of_membership: DataTypes.FLOAT,
      yearly_amount_spent: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Customer',
      tableName: 'customers',
    }
  );
  return Customer;
};
