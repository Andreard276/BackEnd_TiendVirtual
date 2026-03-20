'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbc_categorias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbc_categorias.init({
    nombre:{
      types: DataTypes.STRING(100),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'tbc_categorias',
  });
   tbc_categorias.associate = function(models) {
    tbc_categorias.belongsTo(models.tbb_productos,
       {
      as: 'tbb_producto',
      foreignKey: 'id_categoria',
    });
  };
  return tbc_categorias;
};