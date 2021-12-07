import bcrypt from 'bcryptjs'
import {connect} from '../database'
module.exports ={
    hashPassword : (password:string) =>{
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);
        return password;
    },
    
    //Return true if password is correct
    checkPassword : async (userPassword:string, username:string) =>{ 
        const db = await connect()
        let dbPassword = ''
        try {
    
            let rows:any = await db.query("SELECT password FROM POSSETTOusers WHERE username = ?", [username])
    
            dbPassword = rows[0][0].password
            
    
        } catch (error) {
    
            console.log(error)
            return 0
        }
    
    
        return bcrypt.compareSync(userPassword, dbPassword)
    }
}