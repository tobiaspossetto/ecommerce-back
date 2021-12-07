import joi from '@hapi/joi'

module.exports = {
    
    createUserSchema: joi.object({
        username: joi.string().min(4).required(),
        email: joi.string().min(6).required(),
        adress: joi.string().min(6).required(),
        phone: joi.string().min(6).required(),
        password: joi.string().min(8).required(),
        repeatPassword: joi.ref('password') && joi.string().required()

    }),

    updateUserSchema: joi.object({
        adress: joi.string().min(6).required(),
        phone: joi.string().min(6).required(),
        password: joi.string().min(8).required(),
        repeatPassword: joi.ref('password') && joi.string().required()
    }),
    loginUserSchema: joi.object({
        username: joi.string().min(6).required(),
        password: joi.string().min(6).required(),

    }),
    createProductSchema: joi.object({
        name: joi.string().min(3).required(),
        description: joi.string().min(6).required(),
        stock: joi.number().integer().min(1).required(),
        price: joi.number().min(1).required(),
        category: joi.string().min(3).required(),
        image: joi.object({
            filename: joi.string().required(),
            // path: joi.string().required(),
            // headers: joi.object({
            //     'content-disposition': joi.string().required(),
            //     'content-type': joi.string().valid(['image/jpeg']).required(),
            // }).required(),
            // bytes: joi.number().required()
        })

    })
}