import { UploadedFile } from 'express-fileupload'
import fs from 'fs'
import path from 'path'
import { CustomError } from '../../domain'
import { UUIDAdapter } from '../../config'

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
            if(!validExtensions.includes(fileExtension)){
                throw CustomError.badRequest(`Invalid file extension: ${fileExtension}, valid extensions: ${validExtensions}`)
            }

            const destination = path.join(__dirname, '../../../', folder)
            this.checkFolder(destination)

            const fileName = `${UUIDAdapter.v4()}.${fileExtension}`

            file.mv(`${destination}/${fileName}`)

            return {fileName}
        } catch (error) {
            // console.log({error})
            throw error
        }
    }

    async uploadMultiple(
        files: UploadedFile[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ){
        const fileNames = await Promise.all(
            files.map(file => this.uploadSingle(file, folder, validExtensions))
        )
        return fileNames
        
    }
}