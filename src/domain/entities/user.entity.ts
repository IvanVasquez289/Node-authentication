import { CustomError } from "../errors/custom.error";

export class UserEntity{

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string[],
        public img?: string
    ){}

    public static fromObject(object: {[key: string]: any}){
        const { id, _id ,name, email, emailValidated, password, role, img } = object;

        if(!id && !_id){
            throw CustomError.badRequest('Missing id')
        }
        
        if(!name) throw CustomError.badRequest('Missing name')
        if(!email) throw CustomError.badRequest('Missing email')
        if(emailValidated === undefined) throw CustomError.badRequest('Missing emailValidated') // se debe poner undefined porque por defecto es false
        if(!password) throw CustomError.badRequest('Missing password')
        if(!role) throw CustomError.badRequest('Missing role')

        return new UserEntity(id || _id, name, email, emailValidated, password, role, img)
    }
}