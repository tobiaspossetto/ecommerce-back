import nodemailer from 'nodemailer';
import { connect } from '../database'
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'tobigpossetto@gmail.com',
        pass: 'vxhbzrnsxcjsoivn'
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});


    export  const sendEmail =   async (email:string) => {
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
                 text: 'Hello world?', // plain text body
                 html: `<a src=${newToken}>Hello world?</a>` // html body
             })
 
             try {
                 const db = await connect()
                 await db.query("INSERT INTO emailTokens SET ?", [token])
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


   