'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    })
  };

  return Review;
};