import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-upload-service";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";

export class FileUploadRoutes {

    static get routes(): Router {
        const router = Router();
        const controller = new FileUploadController(
            new FileUploadService()
        )

        //Middlewares
        router.use(FileUploadMiddleware.containFiles)

        //? Definir las rutas
        //* api/upload/single/<user|category|product>/
        //* api/upload/multiple/<user|category|product>/

        router.post('/single/:type', controller.uploadFile)
        router.post('/multiple/:type',controller.uploadMultipleFiles)
        return router;
    }
}