import { CategoryModel } from "../../data/mongo";
import { CreateCategoryDto, CustomError } from "../../domain";
import { UserEntity } from '../../domain/entities/user.entity';

export class CategoryService {
    constructor(){}

    async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity){
        const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name })
        if(categoryExists) throw CustomError.badRequest('Category already exists');

        try {
            const category = await CategoryModel.create({
                name: createCategoryDto.name,
                available: createCategoryDto.available,
                user: user.id
            })

            await category.save()

            return {
                id: category.id,
                name: category.name,
                available: category.available
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

}