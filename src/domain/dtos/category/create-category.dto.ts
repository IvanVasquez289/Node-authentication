export class CreateCategoryDto {

    private constructor(
        public name: string,
        public available: boolean,
    ){}

    static create(object: {[key: string]: any}): [string?, CreateCategoryDto?] {
        const { name, available = false } = object;
        let availableBoolean = available;

        if(!name) return ['Missing name', undefined]

        if(typeof available !== 'boolean'){
            availableBoolean = (available === 'true')
        }
        
        return [undefined, new CreateCategoryDto(name, availableBoolean)]
    }
}