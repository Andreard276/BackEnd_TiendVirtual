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
    id_carrito:{ types: DataTypes.STRING, 
      allowNull: false

     },
    precio_unitario: { 
      types: DataTypes.STRING(10,2),
       allowNull: false 
      },
    cantidad: { 
      types: DataTypes.STRING, 
      allowNull: false,
       defaultValue: '1', 
       validate: { min: 1 
        
       }
      },
    id_producto: { 

      types: DataTypes.STRING, 
      allowNull: false 
    },
  }, {
    sequelize,
    modelName: 'tbd_carrito',
  });
  return tbd_carrito;
};