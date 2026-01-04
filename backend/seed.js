import sequelize from './config/database.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
    try {
        // 1. Conectar y Sincronizar (Crea tablas si no existen)
        await sequelize.authenticate();
        console.log('✅ Base de datos conectada.');

        // force: false para no borrar datos si ya existen
        await sequelize.sync({ force: false });
        console.log('✅ Tablas sincronizadas.');

        // 2. Verificar si existe Master
        const masterExists = await User.findOne({ where: { role: 'master' } });

        if (!masterExists) {
            console.log('⚡ Creando Usuario Maestro...');

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);

            await User.create({
                fullName: 'Yucahome Admin',
                email: 'admin@yucahome.com',
                password: hashedPassword,
                role: 'master',
                active: true,
                phone: '9999999999'
            });

            console.log('🎉 Usuario Maestro creado:');
            console.log('📧 Email: admin@yucahome.com');
            console.log('🔑 Pass: admin123');
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
