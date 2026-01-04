import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'yucahome_super_secret_key_2026';

export const authMiddleware = (req, res, next) => {
    // 1. Obtener token del header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No hay token.' });
    }

    try {
        // 2. Verificar token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Guardamos los datos del usuario en la petición
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

export const requireMaster = (req, res, next) => {
    if (req.user && req.user.role === 'master') {
        next();
    } else {
        res.status(403).json({ message: 'Acceso prohibido. Se requieren permisos de Master.' });
    }
};
