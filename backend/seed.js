import sequelize from './config/database.js';
import User from './models/User.js';
import Profile from './models/Profile.js';
import bcrypt from 'bcryptjs';

/**
 * CREDENCIALES DEL USUARIO MAESTRO
 * ================================
 */
const MASTER_CREDENTIALS = {
    email: 'yh_superadmin_x9k7m@yucahome.internal',
    password: 'Yh$2026#Mstr!Adm1n_Qx',
    fullName: 'Yucahome System Administrator'
};

const seedDatabase = async () => {
    try {
        // 1. Conectar y Sincronizar
        await sequelize.authenticate();
        console.log('✅ Base de datos PostgreSQL conectada.');

        await sequelize.sync({ force: false });
        console.log('✅ Tablas sincronizadas.');

        // 2. Verificar si existe Master
        const masterExists = await User.findOne({ where: { role: 'master' } });

        if (!masterExists) {
            console.log('⚡ Creando Usuario Maestro...\n');
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(MASTER_CREDENTIALS.password, salt);

            await User.create({
                fullName: MASTER_CREDENTIALS.fullName,
                email: MASTER_CREDENTIALS.email,
                password: hashedPassword,
                role: 'master',
                active: true,
                phone: null
            });
            console.log('✅ Usuario Maestro creado exitosamente.');
        } else {
            console.log('ℹ️ El Usuario Maestro ya existe.');
        }

        // 2.1 Verificar si existe Broker por defecto
        const brokerEmail = 'broker@yucahome.com';
        const brokerPass = 'BrokerYuca2026!'; // 15 chars, strong
        const brokerExists = await User.findOne({ where: { email: brokerEmail } });

        const salt = await bcrypt.genSalt(12);
        const hashedBrokerPass = await bcrypt.hash(brokerPass, salt);

        if (!brokerExists) {
            console.log('⚡ Creando Usuario Broker por defecto...\n');
            await User.create({
                fullName: 'Broker Yucahome',
                email: brokerEmail,
                password: hashedBrokerPass,
                role: 'broker',
                active: true,
                phone: '9991234567'
            });
            console.log('✅ Usuario Broker creado exitosamente.');
        } else {
            console.log('🔄 Actualizando contraseña de Broker por defecto...\n');
            brokerExists.password = hashedBrokerPass;
            await brokerExists.save();
            console.log('✅ Contraseña de Broker actualizada.');
        }

        // 3. Sembrar Perfiles de Comprador
        const profilesExist = await Profile.count();
        if (profilesExist === 0) {
            console.log('⚡ Sembrando Perfiles de Comprador...\n');
            const profiles = [
                {
                    name: 'Alto Premium',
                    incomeRange: '> $70,000 MXN',
                    minIncome: 70000,
                    maxIncome: 9999999,
                    targetZones: ['Norte', 'Centro Histórico', 'Playas'],
                    importanceColor: 'purple',
                    description: 'Comprador de lujo, busca plusvalía alta y estilo de vida exclusivo.'
                },
                {
                    name: 'Alto',
                    incomeRange: '$41,000 - $69,000 MXN',
                    minIncome: 41000,
                    maxIncome: 69000,
                    targetZones: ['Norte', 'Centro'],
                    importanceColor: 'blue',
                    description: 'Profesional exitoso, busca buena ubicación y servicios.'
                },
                {
                    name: 'Medio',
                    incomeRange: '$20,000 - $40,000 MXN',
                    minIncome: 20000,
                    maxIncome: 40000,
                    targetZones: ['Poniente', 'Sur', 'Oriente'],
                    importanceColor: 'yellow',
                    description: 'Clase media, busca vivienda funcional y accesible.'
                },
                {
                    name: 'Bajo',
                    incomeRange: '$10,000 - $19,999 MXN',
                    minIncome: 10000,
                    maxIncome: 19999,
                    targetZones: ['Periferia', 'Sur Profundo'],
                    importanceColor: 'gray',
                    description: 'Presupuesto limitado, busca oportunidades económicas.'
                }
            ];

            await Profile.bulkCreate(profiles);
            console.log('✅ 4 Perfiles de Comprador creados.');
        } else {
            console.log('ℹ️ Los Perfiles ya existen.');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error al inicializar DB:', error);
        process.exit(1);
    }
};

seedDatabase();
