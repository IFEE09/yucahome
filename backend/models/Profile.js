import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Profile = sequelize.define('Profile', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING, // Ej: "Alto Premium", "Medio"
        allowNull: false,
        unique: true
    },
    incomeRange: {
        type: DataTypes.STRING, // Ej: "> 70,000", "20,000 - 40,000"
        allowNull: false
    },
    minIncome: {
        type: DataTypes.INTEGER, // Para lógica algorítmica: 70000
        allowNull: false
    },
    maxIncome: {
        type: DataTypes.INTEGER, // Para lógica algorítmica: 9999999 (infinito para premium)
        allowNull: true
    },
    targetZones: {
        type: DataTypes.TEXT, // Almacenaremos un JSON stringify: ["Norte", "Centro", "Playas"]
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('targetZones');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('targetZones', JSON.stringify(value));
        }
    },
    importanceColor: {
        type: DataTypes.STRING, // Ej: "purple" (Premium), "green" (Alto), "yellow" (Medio), "gray" (Bajo)
        allowNull: false,
        defaultValue: "gray"
    },
    description: {
        type: DataTypes.TEXT, // Descripción para el broker
        allowNull: true
    }
});

export default Profile;
