import {Router, Request, Response} from 'express'
import UserController  from '../controllers/userController'
const {createUserSchema, updateUserSchema, loginUserSchema} = require('../lib/schemas')
import Validator from '../middlewares/validator'
import Jwt from '../middlewares/jwt'
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
router.post('/login-user', 
    Valid.loginUser(loginUserSchema),
    ctrl.loginUser
)


router.get('/add', JwtCtrl.checkJwt, (req: Request , res: Response) => {
    res.send('form')
})


export default router

