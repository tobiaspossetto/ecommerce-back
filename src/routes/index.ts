import { Router } from 'express'

import { Request, Response } from 'express'
import UserController from '../controllers/userController'
import ProductsController from '../controllers/productsController'
const { createUserSchema, updateUserSchema, loginUserSchema, createProductSchema,createOrderSchema } = require('../lib/schemas')
import Validator from '../middlewares/validator'
import Jwt from '../middlewares/jwt'
import { transporter } from '../lib/mailer'
const { checkRole } = require('../middlewares/role')

import { uploadImg } from '../middlewares/multer'
import Verify from '../middlewares/protect'
const router: Router = Router();
const UserCtrl = new UserController()
const ProductCtrl = new ProductsController()
const Valid = new Validator()
const verify = new Verify()




//USERS
//For look users (develop)
router.get('/', UserCtrl.getUser)

//For create users
router.post('/create-user',
    Valid.validate(createUserSchema),
    UserCtrl.createUser
)

//For login users
router.post('/login-user',
    Valid.validate(loginUserSchema),
    UserCtrl.loginUser
)


//For confirm email 
router.get('/confirmEmail/:token/:email', UserCtrl.confirmEmail)


//PRODUCTS

//Create a new product 
router.post('/create-product', verify.checkJwt, verify.checkRole, verify.checkEmailVerification, uploadImg, verify.productSchema, ProductCtrl.createProduct)

//get products

router.get('/all-products', ProductCtrl.getProducts)

router.get('/all-products/:id', ProductCtrl.getProductById)

//consult stock and price of specified product
router.get('/consult-products/', ProductCtrl.consultStockAndPrice)

//Update product by id
router.post('/update-product/:id', verify.checkJwt, verify.checkRole, verify.checkEmailVerification, verify.productSchema, ProductCtrl.updateProduct)


//delete product by id
router.post('/delete-product/:id', verify.checkJwt, verify.checkRole, verify.checkEmailVerification, ProductCtrl.deleteProduct)


//ORDERS
const order = async (req:Request, res:Response) => {
    return(


        res.send(req.body)
    )
}

 router.post('/create-order', Valid.validate(createOrderSchema),order)


export default router

