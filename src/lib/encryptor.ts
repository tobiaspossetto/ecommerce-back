import bcrypt from 'bcryptjs'

module.exports ={
    hashPassword : (password:string) =>{
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);
        return password;
    }
}