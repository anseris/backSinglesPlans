const nodemailer = require('nodemailer');
// Configurar el transportador de correo
const fs = require('fs');
const path = require('path');
const transporter = nodemailer.createTransport({
    service: 'gmail', // O el servicio que uses
    auth: {
        user: 'anseris51@gmail.com',
        pass:  'kubc zrnn kjlg kxxx',
    },
});

const sendEmail = async (req, res) => {

    console.log('LLLLLLLL')
    const { to, title, link } = req.body;

    // Leer la plantilla HTML y reemplazar las variables
    const templatePath = path.join(__dirname, 'plantilla-correo.html');
    console.log('templatePath', templatePath)
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');
    htmlContent = htmlContent.replace('{{link}}', link)

    const mailOptions = {
        from: 'tu-email@gmail.com',
        to,
        subject: title,
        html: htmlContent
    };

    // Envía el correo
    try {
        await transporter.sendMail(mailOptions);
        res.send({ success: true, message: 'Correo enviado exitosamente' });
    } catch (error) {
        res.send({ success: false, error: error.message });
    }
};

module.exports = {
    sendEmail
};