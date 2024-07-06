import { Request, Response } from "express";
import path from "path";
import fs from 'fs';

export class ImagesController {
    constructor(
        // private readonly imageService: ImageService
    ){}


    getImage = (req: Request, res: Response) => {
        const {type = '', img = ''} = req.params;
        const imagePath = path.join(__dirname, `../../../uploads/${type}/${img}`)
        if(!fs.existsSync(imagePath)){
            return res.status(404).send({ error: 'Image not found' })
        }
        console.log(imagePath)
        res.sendFile(imagePath)
    }
}