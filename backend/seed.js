import sequelize from './config/database.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

/**
 * CREDENCIALES DEL USUARIO MAESTRO
 * ================================
 * Estas credenciales son fijas y seguras.
 * Guárdalas en un lugar seguro.
 */
const MASTER_CREDENTIALS = {
    email: 'yh_superadmin_x9k7m@yucahome.internal',
    password: 'Yh$2026#Mstr!Adm1n_Qx',  // 20 caracteres
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

            console.log('═══════════════════════════════════════════════════════════');
            console.log('🔐 CREDENCIALES DEL USUARIO MAESTRO');
            console.log('═══════════════════════════════════════════════════════════');
            console.log(`📧 Email:    ${MASTER_CREDENTIALS.email}`);
            console.log(`🔑 Password: ${MASTER_CREDENTIALS.password}`);
            console.log('═══════════════════════════════════════════════════════════');
            console.log('✅ Usuario Maestro creado exitosamente.');
            console.log('═══════════════════════════════════════════════════════════\n');
        } else {
            console.log('ℹ️ El Usuario Maestro ya existe.');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error al inicializar DB:', error);
        process.exit(1);
    }
};

seedDatabase();
