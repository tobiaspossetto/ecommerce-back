import { Request, Response, NextFunction} from 'express'


export default class Validator {
      createUser(schema:any){
          return async( req: Request, res: Response, next: NextFunction) =>{
                try {
                    await schema.validateAsync(req.body)
                    next();
                } catch (error : any) {
                    let errorMsg:string =  (error.details[0].message).replace(/\"/g, '');           
                    res.status(400)
                    res.json({err:errorMsg});
                    
                }
          }
      }
    
   
}