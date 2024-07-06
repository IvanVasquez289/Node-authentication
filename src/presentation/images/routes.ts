import { Router } from "express";
import { ImagesController } from "./controller";

export class ImagesRoutes {

    static get routes() {

        const router = Router();
        const controller = new ImagesController()

        //?Middlewares

        //? Definir las rutas
        router.get('/:type/:img', controller.getImage)


        return router
    }
}