import { Request, Response} from 'express'
import {connect} from '../database'
const {hashPassword} = require('../lib/encryptor')
export default  class IndexController {

    async createUser(req: Request, res: Response){
        const { username, email,phone,adress, password } = req.body;
        const db = await connect()
        const newUser:object = {username, email, phone, adress, password:hashPassword(password), adm:0};
        try {

            
            await db.query("INSERT INTO users set ?", [newUser])
            res.status(200)
            res.send('User Created')
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: 'Creation error' })
        }
        
    }
    async getUser(req: Request, res: Response): Promise<any>{
        const db = await connect()
        try {
           
            const users: any = await db.query("SELECT * FROM users")
         
            users[0][0].createdAt = users[0][0].createdAt.toLocaleString()
           
            users[0][0].updatedAt = users[0][0].updatedAt.toLocaleString()
           
            console.log(users[0][0])
            res.send(users[0]).status(200)
        }catch (error) {
            console.log(error)
            res.status(404)
        }

       
       
    }


   
}


