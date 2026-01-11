import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail', // Opción por defecto más común, configurable
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Contraseña de aplicación para Gmail
    }
});

export const sendLeadNotification = async (leadData) => {
    try {
        const { name, surname, phone, email } = leadData;

        // Configurar el correo
        const mailOptions = {
            from: `"MindHaus Leads" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER, // Se envía al mismo correo o uno específico
            subject: 'Propietario MindHuas',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #7CB342; padding: 20px; text-align: center; color: white;">
                        <h2 style="margin: 0;">¡Nueva Solicitud de Venta!</h2>
                    </div>
                    <div style="padding: 20px; background-color: #fafaf9;">
                        <p style="color: #57534e; font-size: 16px;">Un usuario ha completado el formulario para vender su propiedad en MindHaus.</p>
                        
                        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                            <tr style="background-color: #ffffff;">
                                <td style="padding: 12px; border: 1px solid #e0e0e0; font-weight: bold; color: #954E28;">Nombre:</td>
                                <td style="padding: 12px; border: 1px solid #e0e0e0; color: #1c1917;">${name} ${surname}</td>
                            </tr>
                            <tr style="background-color: #f5f5f5;">
                                <td style="padding: 12px; border: 1px solid #e0e0e0; font-weight: bold; color: #954E28;">Teléfono:</td>
                                <td style="padding: 12px; border: 1px solid #e0e0e0; color: #1c1917;">
                                    <a href="https://wa.me/52${phone.replace(/\D/g, '')}" style="color: #7CB342; text-decoration: none; font-weight: bold;">
                                        ${phone} (WhatsApp)
                                    </a>
                                </td>
                            </tr>
                            <tr style="background-color: #ffffff;">
                                <td style="padding: 12px; border: 1px solid #e0e0e0; font-weight: bold; color: #954E28;">Correo:</td>
                                <td style="padding: 12px; border: 1px solid #e0e0e0; color: #1c1917;">
                                    <a href="mailto:${email}" style="color: #954E28; text-decoration: none;">${email}</a>
                                </td>
                            </tr>
                            <tr style="background-color: #f5f5f5;">
                                <td style="padding: 12px; border: 1px solid #e0e0e0; font-weight: bold; color: #954E28;">Fecha:</td>
                                <td style="padding: 12px; border: 1px solid #e0e0e0; color: #1c1917;">${new Date().toLocaleString('es-MX')}</td>
                            </tr>
                        </table>

                        <div style="margin-top: 25px; text-align: center;">
                            <a href="https://wa.me/52${phone.replace(/\D/g, '')}" style="background-color: #7CB342; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Contactar ahora</a>
                        </div>
                    </div>
                    <div style="background-color: #1c1917; padding: 15px; text-align: center; color: #888; font-size: 12px;">
                        Yucahome - Sistema de Notificaciones
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('📧 Correo enviado exitosamente:', info.messageId);
        return true;
    } catch (error) {
        console.error('❌ Error enviando correo:', error);
        return false;
    }
};
