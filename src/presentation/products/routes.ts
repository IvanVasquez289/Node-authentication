import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductsController } from "./controller";

export class ProductRoutes {
    static get routes(): Router {

        const router = Router();
        const productController = new ProductsController

        // Definir las rutas
        router.get('/', productController.getProducts)
        router.post('/', [AuthMiddleware.validateJWT] ,productController.createProduct)


        return router;
    }
}