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
      type: DataTypes.STRING(150),
      allowNull: false
     },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    id_categorias: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbc_categorias',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'tbb_productos',
    tableName: 'tbb_productos',
  });
  tbb_productos.associate = function(models) {
    tbb_productos.belongsTo(models.tbc_categorias, {
      as: 'categoria',
      foreignKey: 'id_categorias',
    });
    tbb_productos.hasMany(models.tbd_carrito_detalle, {
      as: 'detalles',
      foreignKey: 'id_producto'
    });
  };
  return tbb_productos;
};