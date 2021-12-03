import {Router, Request, Response} from 'express'
import UserController  from '../controllers/userController'
const {createUserSchema, updateUserSchema, loginUserSchema} = require('../lib/schemas')
import Validator from '../middlewares/validator'
import Jwt from '../middlewares/jwt'
import { transporter } from '../lib/mailer'
const {checkRole} = require('../middlewares/role')


const router: Router = Router();
const ctrl = new UserController()
const Valid = new Validator()
const JwtCtrl = new Jwt()

//USERS
router.get('/', ctrl.getUser)

router.post('/create-user', 
    Valid.createUser(createUserSchema),
    ctrl.createUser
)

router.get('/confirmEmail/:token/:email', ctrl.confirmEmail)

router.post('/login-user', 
    Valid.loginUser(loginUserSchema),
    ctrl.loginUser
)


router.get('/add', async (req: Request , res: Response) => {
   res.send('add').status(200)
        
    
  
})


export default router

