
import { Request, Response } from 'express'
import { connect } from '../database'
const { hashPassword, checkPassword } = require('../lib/encryptor')

export default class UserController {

    //CREATE USER
    async createUser(req: Request, res: Response) {
        const { username, email, phone, adress, password } = req.body;
        const db = await connect()

        try {
            let emailExists: any = await db.query("SELECT email FROM users WHERE email = ?", [email])
            let userExists: any = await db.query("SELECT username FROM users WHERE username = ?", [username])

            if (emailExists[0].length > 0) {
                res.send({
                    message: 'Email already in use'
                }).status(400)
            } else if (userExists[0].length > 0) {
                res.send({
                    message: 'Username already in use'
                }).status(400)
            } else {
                const newUser: object = { username, email, phone, adress, password: hashPassword(password), adm: 0 };
                try {
                    await db.query("INSERT INTO users set ?", [newUser])
                    res.status(200)
                    res.send('User Created')
                } catch (error) {
                    console.log(error)
                    res.status(404).json({ message: 'Error consulting database' })
                }
            }

        } catch (error) {
            console.log(error)
            res.status(404).json({ message: 'Error consulting database' })
        }

    }

    //GET USERS
    async getUser(req: Request, res: Response): Promise<any> {
        const db = await connect()
        try {

            const users: any = await db.query("SELECT * FROM users")

            users[0].forEach((user: any) => {
                user.createdAt = user.createdAt.toLocaleString()

                user.updatedAt = user.updatedAt.toLocaleString()

            })


            res.send(users[0]).status(200)
        } catch (error) {
            console.log(error)
            res.status(404)
        }



    }


    //LOGIN USER
    async loginUser(req: Request, res: Response) {
        const { username, password } = req.body;
        const db = await connect()
        try {
            let userExists: any = await db.query("SELECT username FROM users WHERE username = ?", [username])
            if (userExists[0].length > 0) {
                const verify = await checkPassword(password, username)

                if (verify) {
                    try {
                        //Envio un token creado para el usuario
                        //Libreria JWT, el token expira en 2h para mayor seguridad
                        // jwt.sign({ userId: rows[0].id, username: rows[0].username, email: rows[0].email }, process.env.SECRET_JWT, { expiresIn: '2h' }, (err, token) => {
                        //     res.json({ token, "id": rows[0].id })
                        // })
                        console.log('User logged')
                        res.status(200).send('password correct')

                    } catch (error) {
                        console.log(error)
                    }

                    
                } else {
                    res.status(400).send('password incorrect')

                }
            } else {
                res.send({
                    message: 'User not found'
                }).status(400)
            }
        } catch (error) {

        }
        // try {
        //     let emailExists:any = await db.query("SELECT email FROM users WHERE email = ?", [email])
        //     let userExists:any = await db.query("SELECT username FROM users WHERE username = ?", [username])

        //     if (emailExists[0].length > 0) {
        //         res.send({
        //             message: 'Email already in use'
        //         }).status(400)
        //     } else if (userExists[0].length > 0) {
        //         res.send({
        //             message: 'Username already in use'
        //         }).status(400)
        //     }else{
        //         const newUser:object = {username, email, phone, adress, password:hashPassword(password), adm:0};
        //         try {
        //             await db.query("INSERT INTO users set ?", [newUser])
        //             res.status(200)
        //             res.send('User Created')
        //         } catch (error) {
        //             console.log(error)
        //             res.status(404).json({ message: 'Error consulting database'})
        //         }
        //     }

        // }catch (error) {
        //     console.log(error)
        //     res.status(404).json({ message: 'Error consulting database'})
        // }

    }



}


