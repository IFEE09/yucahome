import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const VipProperty = sequelize.define('VipProperty', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bedrooms: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    bathrooms: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    area: {
        type: DataTypes.FLOAT, // Metros cuadrados de construcción
        allowNull: true
    },
    landArea: {
        type: DataTypes.FLOAT, // Metros cuadrados de terreno
        allowNull: true
    },
    exclusiveFeatures: {
        type: DataTypes.TEXT, // JSON o texto separado por comas para amenidades VIP
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
});

// Relación: Un Usuario tiene muchas Propiedades VIP
User.hasMany(VipProperty, { foreignKey: 'userId' });
VipProperty.belongsTo(User, { foreignKey: 'userId' });

export default VipProperty;
