import { Request, Response, NextFunction } from 'express'
import { connect } from '../database'
module.exports = {
    checkRole : async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = res.locals.jwtPayload;
        const db = await connect()
        try {
            let rows:any = await db.query(`SELECT adm FROM users WHERE id = ?`, [userId])
            
           
            if (rows[0][0].adm === 1) {
                next()
            } else {
                return res.status(401).send('unauthorized')
            }
        } catch (error) {
            console.error(error)
            return res.status(401).send('error to conect to database')
        }
    }
}