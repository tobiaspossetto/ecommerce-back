import {Router, Request, Response} from 'express'
import {indexController} from '../controllers/indexController'
const router: Router = Router();

// router.get('/', 
    
//     indexController.index
// )

router.get('/', (req:Request, res:Response) => {
    res.status(200).send('ok')
})

router.get('/add', (req: Request , res: Response) => {
    res.send('form')
})


export default router

