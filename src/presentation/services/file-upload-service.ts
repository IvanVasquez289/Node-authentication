import { UploadedFile } from 'express-fileupload'
import fs from 'fs'
import path from 'path'

export class FileUploadService {
    constructor(){}

    private checkFolder = (folderPath: string) => {
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath)
        }
    }

    async uploadSingle(
        file: UploadedFile,
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ){
        try {
            const fileExtension = file.mimetype.split('/')[1]
            const destination = path.join(__dirname, '../../../', folder)
            this.checkFolder(destination)

            file.mv(destination + `/mi-imagen.${fileExtension}`)
        } catch (error) {
            console.log({error})
        }
    }

    uploadMultiple(
        file: any,
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ){

    }
}