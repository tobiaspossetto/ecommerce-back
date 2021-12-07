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
                    res.json({"error":true, "message":errorMsg});
                    
                }
          }
      }
      loginUser(schema:any){
        return async( req: Request, res: Response, next: NextFunction) =>{
              try {
                  await schema.validateAsync(req.body)
                  next();
              } catch (error : any) {
                  let errorMsg:string =  (error.details[0].message).replace(/\"/g, '');           
                  res.status(400)
                  res.json({"error":true, "message":errorMsg});
                  
              }
        }

       
    }
    createProduct(schema:any){
        return async( req: Request, res: Response, next: NextFunction) =>{
              try {
                  await schema.validateAsync(req.body)
                  next();
              } catch (error : any) {
                  let errorMsg:string =  (error.details[0].message).replace(/\"/g, '');   
                  console.error(errorMsg);        
                  res.status(400)
                  res.json({"error":true, "message":errorMsg});
                  
              }
        }
   
}}