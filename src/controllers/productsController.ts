import { Request, Response } from 'express'
import { connect } from '../database'
import fs from 'fs-extra'
import Cloudinary from 'cloudinary'

export default class ProductsController {
    createProduct = async (req: Request, res: Response) => {
        const { name, description, price, category, stock } = req.body
        const newProduct = {name, description, price, category, stock}
     
       
        const db = await connect()
        let resultCloudinary1:any, resultCloudinary2:any
         
        try {
            console.log('subiendo a cloudinary')
              //@ts-ignore
              resultCloudinary1 = await Cloudinary.v2.uploader.upload(req.files.image1[0].path)
              //@ts-ignore
              resultCloudinary2 = await Cloudinary.v2.uploader.upload(req.files.image2[0].path)
             
                //@ts-ignore
                await fs.unlink(req.files.image1[0].path) 
                //@ts-ignore
              await fs.unlink(req.files.image2[0].path) 

              try {
                let resProduct:any =  await db.query("INSERT INTO POSSETTOproducts set ?", [newProduct])
                
                console.log('guardando en la db')
                try {
                 
                    let newImagen1 = {
                        idProduct : resProduct[0].insertId,
                        url: resultCloudinary1.url,
                        type: resultCloudinary1.format, 
                        size: resultCloudinary1.bytes
                    }
    
                    let newImagen2 = {
                        idProduct : resProduct[0].insertId,
                        url: resultCloudinary2.url,
                        type: resultCloudinary2.format, 
                        size: resultCloudinary2.bytes
                    }
    
                  
                    await db.query('INSERT INTO POSSETTOimg set ?',  [newImagen1])
                    await db.query('INSERT INTO POSSETTOimg set ?',  [newImagen2])
    
                    res.json({"error":false, "message":"products created successfully"}).status(200)
                } catch (error) {
                    console.error(error)
    
                    await Cloudinary.v2.uploader.destroy(resultCloudinary1.public_id)
                  
                    await Cloudinary.v2.uploader.destroy(resultCloudinary2.public_id)
    
                    await db.query('DELETE FROM POSSETTOproducts WHERE id = ?', [resProduct[0].insertId])
    
                    res.status(400).json({error:true, 'message': 'Error creating product. Try again'})
                }
    
              
            } catch (error) {
               console.log(error)
               
                    await Cloudinary.v2.uploader.destroy(resultCloudinary1.public_id)
                  
                    await Cloudinary.v2.uploader.destroy(resultCloudinary2.public_id)
    
                  
                
                     console.error(error)
                     res.status(400).json({error:true, 'message': 'Error creating product. Try again'})
                 
               
              
            }
          
        } catch (error) {
            console.error(error)
            res.status(400).json({error:true, 'message': 'Error creating product. Try again (cloud services problem)'})
        }

    
        
        
     
     }

    getProducts = async (req: Request, res: Response) => {
        const db = await connect()
        try {
            let resultProduct:any = await db.query('SELECT POSSETTOproducts.id, POSSETTOproducts.category, POSSETTOproducts.name, POSSETTOproducts.description,POSSETTOproducts.stock,POSSETTOproducts.price, (select POSSETTOimg.url from POSSETTOimg where POSSETTOimg.idProduct = POSSETTOproducts.id limit 1) as url1, (select POSSETTOimg.url from POSSETTOimg where POSSETTOimg.idProduct = POSSETTOproducts.id limit 1) as url2 FROM POSSETTOproducts')
            res.status(200).json(resultProduct[0])
        } catch (error) {
            console.log(error)
            res.status(400).json({error:true, 'message': 'Error getting products. Try again'})
        }
       
        
    }

    getProductById = async (req: Request, res: Response) => {
        const id = req.params.id
        const db = await connect()
        try {
            let resultProduct:any = await db.query('SELECT POSSETTOproducts.id, POSSETTOproducts.category, POSSETTOproducts.name, POSSETTOproducts.description,POSSETTOproducts.stock,POSSETTOproducts.price, (select POSSETTOimg.url from POSSETTOimg where POSSETTOimg.idProduct = POSSETTOproducts.id limit 1) as url1, (select POSSETTOimg.url from POSSETTOimg where POSSETTOimg.idProduct = POSSETTOproducts.id limit 1) as url2 FROM POSSETTOproducts where POSSETTOproducts.id = ?', [id])
            if(resultProduct[0].length > 0){
                res.status(200).json({"error":false,"message":resultProduct[0][0]})
            }else{
                res.status(400).json({error:true, 'message': 'Product not found'})
            }
            
        } catch (error) {
            console.log(error)
            res.status(400).json({error:true, 'message': 'Error getting products. Try again'})
        }
    }
    consultStockAndPrice = async (req: Request, res: Response) => {
        const id = req.query.id
        const db = await connect()
        const array = (<string>id).split(',')
        let resProduct:any = []

        let dinamicConsult:string = ''
        array.forEach(element => {    
            dinamicConsult += ` id = ${element} or`
        })
        //quit the last 'or' in dinamicConsult
        dinamicConsult = dinamicConsult.substring(0, dinamicConsult.length - 2)
            try{
                let consultProduct:any = await db.query(`SELECT id, price, stock, name FROM POSSETTOproducts where ${dinamicConsult}`)
                res.status(200).json({error:false, "message":consultProduct[0][0]})
               
            }catch(error){
                console.log(error)
                res.status(400).json({error:true, 'message': 'Error getting products. Try again'})
            }
       
    }

    
}
