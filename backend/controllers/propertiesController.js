import Property from '../models/Property.js';
import VipProperty from '../models/VipProperty.js';

// --- PROPIEDADES ESTÁNDAR ---

export const getMyProperties = async (req, res) => {
    try {
        const userId = req.user.id;
        const properties = await Property.findAll({ where: { userId } });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener propiedades', error });
    }
};

export const createProperty = async (req, res) => {
    try {
        const userId = req.user.id;

        // Procesar imagen si existe
        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const newProperty = await Property.create({
            ...req.body,
            userId,
            imageUrl
        });
        res.status(201).json(newProperty);
    } catch (error) {
        console.error('Create Property Error:', error);
        res.status(500).json({ message: 'Error al crear propiedad', error: error.message });
    }
};

export const deleteProperty = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const deleted = await Property.destroy({ where: { id, userId } });

        if (!deleted) return res.status(404).json({ message: 'Propiedad no encontrada o no autorizada' });

        res.json({ message: 'Propiedad eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar', error });
    }
};

// --- ZONAS VIP ---

export const getMyVipProperties = async (req, res) => {
    try {
        const userId = req.user.id;
        const properties = await VipProperty.findAll({ where: { userId } });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener zonas VIP', error });
    }
};

export const createVipProperty = async (req, res) => {
    try {
        const userId = req.user.id;

        // Procesar imagen si existe
        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const newProperty = await VipProperty.create({
            ...req.body,
            userId,
            imageUrl
        });
        res.status(201).json(newProperty);
    } catch (error) {
        console.error('Create VIP Property Error:', error);
        res.status(500).json({ message: 'Error al crear zona VIP', error: error.message });
    }
};

export const deleteVipProperty = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const deleted = await VipProperty.destroy({ where: { id, userId } });

        if (!deleted) return res.status(404).json({ message: 'Zona VIP no encontrada o no autorizada' });

        res.json({ message: 'Zona VIP eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar', error });
    }
};
