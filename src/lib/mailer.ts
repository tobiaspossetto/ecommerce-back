import nodemailer from 'nodemailer';
import { connect } from '../database'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'tobigpossetto@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    }
});


export const sendEmail = async (email: string, id: any) => {
    //generate token random
    const newToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const token = {
        token: newToken,
        used: 0
    }
    try {
        await transporter.sendMail({
            from: '"Ecommerce App" <tobigpossetto@gmail.com>', // sender address
            to: `${email}`, //person
            subject: 'Por favor verifica tu cuenta',
            text: 'Para completar tu registro ingresa al siguiente link. Si no fuiste tu el que se registró, ignora este mensaje.', // plain text body
            html: `
                    <h1>Por favor verifica tu cuenta</h1>
                    <p>Para completar tu registro ingresa al siguiente link. Si no fuiste tu el que se registró, ignora este mensaje.</p>
                 
                     <a style={padding:10px; background: black; color: white; text-aling:center;} href="http://localhost:4000/confirmEmail/${newToken}/${email}">Verificar</a>` // html body


        })

        try {
            const db = await connect()
            await db.query("INSERT INTO POSSETTOemailTokens SET ?", [token])
            return true
        } catch (error) {
            console.log(error)
            return false
        }



    } catch (error) {
        console.log(error);
        return false
    }
}


