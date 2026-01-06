import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Property = sequelize.define('Property', {
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
        type: DataTypes.DECIMAL(15, 2), // Soporta precios grandes
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING, // Casa, Depto, Terreno, etc.
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
    imageUrl: {
        type: DataTypes.STRING, // URL de la imagen principal
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

// Relación: Un Usuario tiene muchas Propiedades
User.hasMany(Property, { foreignKey: 'userId' });
Property.belongsTo(User, { foreignKey: 'userId' });

export default Property;
