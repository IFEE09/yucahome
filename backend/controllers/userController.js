import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'yucahome_super_secret_key_2026';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar usuario
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // 2. Verificar password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // 3. Generar token
        const token = jwt.sign(
            { id: user.id, role: user.role, name: user.fullName },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Bienvenido a MindHaus',
            token,
            user: {
                id: user.id,
                name: user.fullName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const createBroker = async (req, res) => {
    try {
        // Esta función asume que ya verificamos que quien llama es MASTER (vía middleware)
        const { fullName, email, password, phone } = req.body;

        // 1. Verificar si ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // 2. Encriptar password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Crear usuario con rol BROKER
        const newBroker = await User.create({
            fullName,
            email,
            password: hashedPassword,
            phone,
            role: 'broker', // Forzamos el rol broker
            active: true
        });

        res.status(201).json({
            message: 'Broker creado exitosamente',
            broker: {
                id: newBroker.id,
                name: newBroker.fullName,
                email: newBroker.email
            }
        });

    } catch (error) {
        console.error('Create Broker error:', error);
        res.status(500).json({ message: 'Error al crear broker' });
    }
};
