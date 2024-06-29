import { Request, Response } from "express";
import { CustomError } from "../../domain";

export class ProductsController {
    constructor(
        //TODO: private readonly productService: ProductService
    ){}

    private handleError = (error: any, res: Response) => {
        if(error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(error) // No esperamos que esto suceda, pero si hay un error veremos que es
        return res.status(500).json({ error: 'Internal server error' })
    }

    createProduct = (req:Request, res: Response) => {
        res.json('createProduct')
    }

    getProducts = (req:Request, res: Response) => {
        res.json('getProducts')
    }
}