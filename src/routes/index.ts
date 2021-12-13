import {Router} from 'express'


import UserController  from '../controllers/userController'
import ProductsController  from '../controllers/productsController'
const {createUserSchema, updateUserSchema, loginUserSchema,createProductSchema} = require('../lib/schemas')
import Validator from '../middlewares/validator'
import Jwt from '../middlewares/jwt'
import { transporter } from '../lib/mailer'
const {checkRole} = require('../middlewares/role')

import {uploadImg} from '../middlewares/multer'
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
    Valid.createUser(createUserSchema),
    UserCtrl.createUser
)

//For login users
router.post('/login-user', 
    Valid.loginUser(loginUserSchema),
    UserCtrl.loginUser
)


//For confirm email 
router.get('/confirmEmail/:token/:email', UserCtrl.confirmEmail)


//For admin products   verify.checkJwt, verify.checkRole, verify.checkEmailVerification,

//Create a new product verify.checkJwt, verify.checkRole, verify.checkEmailVerification,verify.productSchema,,verify.productSchema,ProductCtrl.createProduct
router.post('/create-product', verify.checkJwt, verify.checkRole, verify.checkEmailVerification,uploadImg,verify.productSchema,ProductCtrl.createProduct )

//get products

router.get('/all-products', ProductCtrl.getProducts)

router.get('/all-products/:id', ProductCtrl.getProductById)

//consult stock and price of specified product
router.get('/consult-products/', ProductCtrl.consultStockAndPrice)

//Update product by id
router.post('/update-product/:id', verify.checkJwt, verify.checkRole, verify.checkEmailVerification,verify.productSchema, ProductCtrl.updateProduct)

export default router

