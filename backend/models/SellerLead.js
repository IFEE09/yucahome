import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SellerLead = sequelize.define('SellerLead', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    status: {
        type: DataTypes.ENUM('new', 'contacted', 'closed', 'archived'),
        defaultValue: 'new'
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

export default SellerLead;
