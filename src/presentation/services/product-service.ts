import { ProductModel } from "../../data/mongo";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";

export class ProductService {

    constructor(){}

    public async createProduct(createProductDto: CreateProductDto) {
        const productExists = await ProductModel.findOne({ name: createProductDto.name })

        if(productExists) throw CustomError.badRequest('Product already exists');

        try {
            const product = await ProductModel.create(createProductDto)
            await product.save()
            console.log(product)
            return product
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }


    async getProducts(paginationDto:PaginationDto){
        const {page, limit} = paginationDto;
        try {
            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .populate('user')
                    .populate('category')
            ])

            return {
                page: page,
                limit: limit,
                total: total,
                next: `/api/products?page=${page + 1}&limit=${limit}`,
                prev: (page - 1 > 0) ? `/api/products?page=${page - 1}&limit=${limit}` : null,
                products: products
            }
        } catch (error) {
            throw CustomError.internalServer('Internal server error')
        }
    }
}