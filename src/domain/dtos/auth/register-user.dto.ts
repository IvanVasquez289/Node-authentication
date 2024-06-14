import { regularExps } from "../../../config/regular-exp";

export class RegisterUserDto {
    private constructor(
        public name: string,
        public email: string,
        public password: string
    ){}

    static create(object: {[key: string]: any}): [string?, RegisterUserDto?]{
        const { name, email, password } = object;
        if(!name) return ['name is required', undefined]
        if(!email) return ['email is required', undefined]
        if(!regularExps.email.test(email)) return ['email is not valid', undefined]
        if(!password) return ['password is required', undefined]
        if(password.length < 6) return ['password must have at least 6 characters', undefined]
        return [undefined, new RegisterUserDto(name, email, password)]
    }
}