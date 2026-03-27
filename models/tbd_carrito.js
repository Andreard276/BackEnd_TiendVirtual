'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbd_carrito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbd_carrito.init({
    id_usuario: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'tbc_usuarios',
        key: 'id'
      }
    },
    total: { 
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      defaultValue: 0
    },
    fecha_creacion: { 
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'tbd_carrito',
  });
  tbd_carrito.associate = function(models) {
    tbd_carrito.belongsTo(models.tbc_usuario, {
      as: 'usuario',
      foreignKey: 'id_usuario'
    });
    tbd_carrito.hasMany(models.tbd_carrito_detalle, {
      as: 'detalles',
      foreignKey: 'id_carrito'
    });
  };
  return tbd_carrito;
};