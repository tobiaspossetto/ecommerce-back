import { Request, Response } from 'express'
import { connect } from '../database'
import fs from 'fs-extra'
import Cloudinary from 'cloudinary'

export default class ProductsController {
    createProduct = async (req: Request, res: Response) => {
        const { name, description, price, category, stock } = req.body
        const newProduct = {name, description, price, category, stock}
        //@ts-ignore
        console.log(req.files.image1[0])
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
                console.table(resProduct)
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
    
                    res.send('ok').status(200)
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
}
