'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbb_productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbb_productos.init({
    nombre:{ 
      types: DataTypes.STRING(150),
      allowNull: false
     },
    descripcion: {
      types: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      types: DataTypes.STRING(10,2),
      allowNull: false
    },
    stock: {
      types: DataTypes.STRING,
      defaultValue: 0
        },
    id_categorias: {
      types: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'tbb_productos',
  });
  tbb_productos.associate = function(models) {
    tbb_productos.belongsTo(models.tbc_categorias,
       {
      as: 'tbc_categoria',
      foreignKey: 'id_categoria',
    });
  };
  return tbb_productos;
};