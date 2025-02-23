'use strict';
module.exports = (sequelize, DataTypes) => {
  const MasterProduct = sequelize.define('MasterProduct', {
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    },
    actual_price: DataTypes.STRING,
    average_rating: DataTypes.FLOAT,
    brand: DataTypes.STRING,
    category: DataTypes.STRING,
    crawled_at: DataTypes.DATE,
    description: DataTypes.TEXT,
    discount: DataTypes.STRING,
    images: DataTypes.JSON,
    out_of_stock: DataTypes.BOOLEAN,
    pid: DataTypes.STRING,
    product_details: DataTypes.JSON,
    seller: DataTypes.STRING,
    selling_price: DataTypes.STRING,
    sub_category: DataTypes.STRING,
    title: DataTypes.STRING,
    url: DataTypes.TEXT
  }, {
    tableName: 'master_products'
  });

  return MasterProduct;
};
