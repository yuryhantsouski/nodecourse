'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Product.associate = function(models) {
    Product.hasMany(models.Review, {
      foreignKey: 'productId',
      as: 'reviews'
    });
  };

  return Product;
};