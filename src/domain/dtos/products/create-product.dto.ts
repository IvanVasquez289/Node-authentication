export class CreateProductDto {
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly category: string,
        public readonly user: string
    ){}

    static create(object: {[key: string]: any}): [string?, CreateProductDto?] {
        const { name, available, price, description, category, user } = object;
        if(!name) return ['name is required', undefined]
        
        if(!price) return ['price is required', undefined]
        if(price <= 0) return ['price must be greater than 0', undefined]
        if(isNaN(+price)) return ['price must be a number', undefined]

        if(!description) return ['description is required', undefined]
        if(!category) return ['category is required', undefined]
        if(!user) return ['user is required', undefined]

        return [
            undefined, 
            new CreateProductDto(name, !!available, price, description, category, user)
        ]
    }
}