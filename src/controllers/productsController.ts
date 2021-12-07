import { Request, Response } from 'express'
import { connect } from '../database'
import fs from 'fs-extra'
import Cloudinary from 'cloudinary'

export default class ProductsController {
    createProduct = async (req: Request, res: Response) => {
        //@ts-ignore
       // const result = await Cloudinary.v2.uploader.upload(req.file.path)

       console.log(req.file)
    }
}
