import SellerLead from '../models/SellerLead.js';

// Crear un nuevo lead de vendedor
export const createSellerLead = async (req, res) => {
    try {
        const { name, surname, phone, email } = req.body;

        if (!name || !surname || !phone || !email) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const newLead = await SellerLead.create({
            name,
            surname,
            phone,
            email
        });

        res.status(201).json({
            message: 'Lead registrado exitosamente',
            lead: newLead
        });

    } catch (error) {
        console.error('Error creating seller lead:', error);
        res.status(500).json({ message: 'Error al registrar la solicitud', error: error.message });
    }
};

// Obtener todos los leads (para el dashboard en el futuro)
export const getSellerLeads = async (req, res) => {
    try {
        const leads = await SellerLead.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json(leads);
    } catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({ message: 'Error al obtener leads' });
    }
};
