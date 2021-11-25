
import { Request, Response } from 'express'
import { connect } from '../database'
import jwt from 'jsonwebtoken'
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
            let user: any = await db.query("SELECT * FROM users WHERE username = ?", [username])
            if (user[0].length > 0) {
                const verify = await checkPassword(password, username)

                if (verify) {
                    try {
                        let secretKey:any = process.env.SECRET_JWT;
                       
                        jwt.sign({ userId: user[0][0].id, username: user[0][0].username, email: user[0][0].email }, secretKey, { expiresIn: '2h' }, (err, token) => {
                            res.json({ token, "id": user[0][0].id , "username": user[0][0].username}).status(200)
                            if (err) {
                                console.log(err)
                            }
                        })
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
            console.log(error)
        }
       
    }



}


