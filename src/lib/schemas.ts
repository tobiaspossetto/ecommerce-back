import joi from '@hapi/joi'

module.exports = {
    createUserSchema: joi.object({
        username: joi.string().min(4).required(),
        email: joi.string().min(6).required(),
        adress: joi.string().min(6).required(),
        phone: joi.string().min(6).required(), 
        password: joi.string().min(8),
        repeatPassword: joi.ref('password')

    }),

    updateUserSchema: joi.object({
        adress: joi.string().min(6).required(),
        phone: joi.string().min(6).required(),
        password: joi.string().min(8),
        repeatPassword: joi.ref('password')
    }),
    loginUserSchema: joi.object({
        username: joi.string().min(6).required(),
        password: joi.string().min(6).required(),
        
    })
}