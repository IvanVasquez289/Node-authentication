import { Request, Response } from "express";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";
import { ProductService } from "../services/product-service";

export class ProductsController {
    constructor(
        private readonly productService: ProductService
    ){}

    private handleError = (error: any, res: Response) => {
        if(error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(error) // No esperamos que esto suceda, pero si hay un error veremos que es
        return res.status(500).json({ error: 'Internal server error' })
    }

    createProduct = (req:Request, res: Response) => {
        // res.json('createProduct')

        const [error, createProductDto] = CreateProductDto.create(req.body)
        if(error) return res.status(400).json({ error })

        this.productService.createProduct(createProductDto!)
            .then((product) => res.status(201).json(product))
            .catch((error) => this.handleError(error, res));
    }

    getProducts = (req:Request, res: Response) => {
        // res.json('getProducts')

        const {page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit)
        if(error) return res.status(400).json({ error })

        this.productService.getProducts(paginationDto!)
            .then((products) => res.json(products))
            .catch((error) => this.handleError(error, res));
    }
}