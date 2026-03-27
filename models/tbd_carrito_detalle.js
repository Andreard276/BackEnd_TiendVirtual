'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbd_carrito_detalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbd_carrito_detalle.init({
    id_carrito: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbd_carritos',
        key: 'id'
      }
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1
      }
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbb_productos',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'tbd_carrito_detalle',
  });
  tbd_carrito_detalle.associate = function(models) {
    tbd_carrito_detalle.belongsTo(models.tbd_carrito, {
      as: 'carrito',
      foreignKey: 'id_carrito'
    });
    tbd_carrito_detalle.belongsTo(models.tbb_productos, {
      as: 'producto',
      foreignKey: 'id_producto'
    });
  };
  return tbd_carrito_detalle;
};