import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { FileUploadService } from '../services/file-upload-service';
import type { UploadedFile } from 'express-fileupload';
export class FileUploadController {

    constructor(
        private readonly fileUploadService: FileUploadService
    ){}

    private handleError = (error: any, res: Response) => {
        if(error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(error)
        return res.status(500).json({ error: 'Internal server error' })
    }

    uploadFile = (req: Request, res: Response) => {
        const {type} = req.params
        const validTypes = ['users', 'categories', 'products']

        if(!validTypes.includes(type)) return res.status(400).json({ error: `Invalid type: ${type}, valid types: ${validTypes}` })

       
        //El .file al final es porque asi le pusimos en el body el archivo
        // const file = req.files.file as UploadedFile

        const file = req.body.files.at(0) as UploadedFile

        this.fileUploadService.uploadSingle(file, `/uploads/${type}`)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res));

    }

    uploadMultipleFiles = async (req: Request, res: Response) => {
        const {type} = req.params
        const validTypes = ['users', 'categories', 'products']

        if(!validTypes.includes(type)) return res.status(400).json({ error: `Invalid type: ${type}, valid types: ${validTypes}` })
        
        const files = req.body.files as UploadedFile[]

        this.fileUploadService.uploadMultiple(files, `/uploads/${type}`)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res));

    //    res.json('uploadMultipleFiles')
    }
}