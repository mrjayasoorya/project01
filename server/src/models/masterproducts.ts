'use strict';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database'; // Ensure the correct path

class MasterProduct extends Model {}

MasterProduct.init({
  _id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
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
  url: DataTypes.TEXT,
}, {
  sequelize,
  tableName: 'master_products',
});

export default MasterProduct;
