import { Request, Response } from 'express';
import { CreateCategoryDto, CustomError } from '../../domain';
export class CategoryController {

    constructor(){}

    private handleError = (error: any, res: Response) => {
        if(error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(error) // No esperamos que esto suceda, pero si hay un error veremos que es
        return res.status(500).json({ error: 'Internal server error' })
    }

    public createCategory = (req: Request, res: Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body)
        if(error) return res.status(400).json({ error })
        
        res.json(createCategoryDto)
    }

    public getCategories = (req: Request, res: Response) => {
        res.json('get category')
    }
}