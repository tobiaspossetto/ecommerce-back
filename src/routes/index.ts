import {Router, Request, Response} from 'express'
import indexController  from '../controllers/indexController'
const {createUserSchema, updateUserSchema} = require('../lib/schemas')
import Validator from '../middlewares/validator'
const router: Router = Router();
const ctrl = new indexController()

let Valid = new Validator()

router.post('/create-user', 
    Valid.createUser(createUserSchema),
    ctrl.createUser
)

router.get('/', ctrl.getUser)

router.get('/add', (req: Request , res: Response) => {
    res.send('form')
})


export default router

