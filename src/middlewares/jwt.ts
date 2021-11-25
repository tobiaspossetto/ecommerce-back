import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export default class Jwt {
    checkJwt = (req: Request, res: Response, next: NextFunction) => {
        const bearerHeader = req.headers['authorization'];
        let jwtPayload;
        let secretKey:any = process.env.SECRET_JWT;
        //Si la cabecera no es undefined
        if (typeof bearerHeader !== 'undefined') {


            //Se verifica ese token con la funcion verify, para saber si coincide con el token de la sesión
            jwt.verify(bearerHeader, secretKey, (err:any, authData: any) => {
                if (err) {

                    return res.status(401).json({ error: 'unauthorized' });


                } else {
                    jwtPayload = authData;
                    res.locals.jwtPayload = jwtPayload;
                    next()
                }
            })

        } else {


            return res.status(401).json({ error: 'unauthorized' });

        }
    }
}