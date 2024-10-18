// pages/api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Create a transporter object using SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service
            auth: {
                user: 'your-email@gmail.com', // Your email address
                pass: 'your-email-password', // Your email password
            },
        });

        // Set up email data
        let mailOptions = {
            from: email,
            to: 'mikaela.mathisson@hotmail.se', // Admin email address
            subject: `Contact form submission from ${name}`,
            text: message,
        };

        try {
            // Send mail
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error sending email', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}