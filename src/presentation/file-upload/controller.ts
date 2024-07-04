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

        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files were selected' })
        }

        const file = req.files.file as UploadedFile

        this.fileUploadService.uploadSingle(file, `/uploads/${type}`)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res));
    }

    uploadMultipleFiles = (req: Request, res: Response) => {
       res.json('uploadMultipleFiles')
    }
}