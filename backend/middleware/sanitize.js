/**
 * Middleware de Sanitización y Validación
 * Protege contra SQL Injection y ataques comunes
 */

// Patrones peligrosos de SQL Injection
const SQL_INJECTION_PATTERNS = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE|EXEC|EXECUTE)\b)/gi,
    /(-{2}|\/\*|\*\/|;)/g,  // Comentarios SQL y terminadores
    /(\bOR\b|\bAND\b)\s*\d+\s*=\s*\d+/gi,  // OR 1=1, AND 1=1
    /'.*?'/g,  // Comillas simples sospechosas
    /\bxp_\w+/gi,  // Procedimientos SQL Server
    /\bsp_\w+/gi,
];

// Caracteres no permitidos en campos de texto
const DANGEROUS_CHARS = /[<>{}[\]|\\^~`]/g;

/**
 * Verifica si un string contiene patrones de SQL Injection
 */
export const containsSQLInjection = (input) => {
    if (typeof input !== 'string') return false;

    for (const pattern of SQL_INJECTION_PATTERNS) {
        if (pattern.test(input)) {
            return true;
        }
    }
    return false;
};

/**
 * Sanitiza un string eliminando caracteres peligrosos
 */
export const sanitizeString = (input) => {
    if (typeof input !== 'string') return input;

    // Remover caracteres peligrosos
    let sanitized = input.replace(DANGEROUS_CHARS, '');

    // Escapar comillas
    sanitized = sanitized.replace(/'/g, "''");

    // Limitar longitud
    return sanitized.substring(0, 500);
};

/**
 * Valida formato de email
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 254;
};

/**
 * Valida fortaleza de contraseña
 */
export const isStrongPassword = (password) => {
    // Mínimo 12 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número, 1 especial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#-])[A-Za-z\d@$!%*?&_#-]{12,}$/;
    return passwordRegex.test(password);
};

/**
 * Middleware para validar y sanitizar el body de requests
 */
export const sanitizeInputs = (req, res, next) => {
    if (req.body && typeof req.body === 'object') {
        for (const [key, value] of Object.entries(req.body)) {
            // Verificar SQL Injection
            if (containsSQLInjection(value)) {
                console.warn(`⚠️ SQL Injection detectado en campo: ${key}`);
                return res.status(400).json({
                    message: 'Entrada inválida detectada. Intento registrado.',
                    error: 'INVALID_INPUT'
                });
            }

            // Sanitizar strings (excepto passwords que se hashean)
            if (typeof value === 'string' && key !== 'password') {
                req.body[key] = sanitizeString(value);
            }
        }
    }
    next();
};

/**
 * Middleware específico para validar login
 */
export const validateLoginInput = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Formato de email inválido' });
    }

    if (password.length < 8 || password.length > 128) {
        return res.status(400).json({ message: 'Contraseña debe tener entre 8 y 128 caracteres' });
    }

    next();
};

/**
 * Middleware para validar creación de broker
 */
export const validateBrokerInput = (req, res, next) => {
    const { fullName, email, password, phone } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Nombre, email y contraseña son requeridos' });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Formato de email inválido' });
    }

    if (!isStrongPassword(password)) {
        return res.status(400).json({
            message: 'Contraseña débil. Requiere: mínimo 12 caracteres, mayúscula, minúscula, número y carácter especial (@$!%*?&_#-)'
        });
    }

    if (fullName.length < 3 || fullName.length > 100) {
        return res.status(400).json({ message: 'Nombre debe tener entre 3 y 100 caracteres' });
    }

    if (phone && !/^[0-9+\-\s()]{7,20}$/.test(phone)) {
        return res.status(400).json({ message: 'Formato de teléfono inválido' });
    }

    next();
};
