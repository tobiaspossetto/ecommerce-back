//Middlewares for protect routes
import { connect } from '../database'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export default class Verify {
    checkJwt = (req: Request, res: Response, next: NextFunction) => {
        const bearerHeader = req.headers['authorization'];
        let jwtPayload;
        let secretKey: any = process.env.SECRET_JWT;
        //Si la cabecera no es undefined
        if (typeof bearerHeader !== 'undefined') {


            //Se verifica ese token con la funcion verify, para saber si coincide con el token de la sesión
            jwt.verify(bearerHeader, secretKey, (err: any, authData: any) => {
                if (err) {

                    return res.status(401).json({ "error": true, "message": "unauthorized" })


                } else {
                    jwtPayload = authData;
                    res.locals.jwtPayload = jwtPayload;
                    next()
                }
            })

        } else {


            return res.status(401).json({ "error": true, "message": "unauthorized" })

        }
    }

    checkRole = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = res.locals.jwtPayload;
        const db = await connect()
        try {
            let rows: any = await db.query(`SELECT adm FROM POSSETTOusers WHERE id = ?`, [userId])


            if (rows[0][0].adm === 1) {
                next()
            } else {
                return res.status(401).json({ "error": true, "message": "unauthorized" })
            }
        } catch (error) {
            console.error(error)
            return res.status(404).json({ "error": true, "message": "error to conect to database" })
        }
    }

    checkEmailVerification = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = res.locals.jwtPayload;
        const db = await connect()
        try {
            let rows: any = await db.query(`SELECT emailVerify FROM POSSETTOusers WHERE id = ?`, [userId])

            
            if (rows[0][0].emailVerify === 1) {
                next()
            } else {
                return res.status(401).json({ "error": true, "message": "email not verified" })
            }
        } catch (error) {
            console.error(error)
            return res.status(404).json({ "error": true, "message": "error to conect to database" })
        }
    }

    productSchema =  async (req: Request, res: Response, next: NextFunction) => {
        let {name, description, price, category, stock} = req.body
        stock = parseInt(stock)
        price = parseFloat(price)

        name = String(name)
        description = String(description)
        category = String(category)
        if(typeof name === 'string' && typeof description === 'string' && typeof price === 'number' && typeof category === 'string' && typeof stock === 'number'){
            if(stock >= 1 && price >= 1){
                console.log('ok')
                next()
            }else{
                return res.status(401).json({ "error": true, "message": "stock and price must be greater than zero" })
            }
            

        }else{
            console.log( name, typeof description, typeof price, typeof category, typeof stock)
            console.log( 'some input type is wrong')
            return res.status(401).json({ "error": true, "message": "some input type is wrong" })
            
        
        
        }
    }
}