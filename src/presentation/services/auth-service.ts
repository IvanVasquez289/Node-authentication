import { UserModel } from "../../data/mongo";
import { CustomError, UserEntity } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";

export class AuthService {
    constructor(

    ){}

    public async registerUser(registerUserDto: RegisterUserDto) {
        const existsUser = await UserModel.findOne({ email: registerUserDto.email });
        if(existsUser) throw CustomError.badRequest('User already exists');
        
        try {
            const user = await UserModel.create(registerUserDto)
            await user.save()
            
            const userEntity = UserEntity.fromObject(user)
            const {password, ...rest} = userEntity;
           
            //TODO: Encrypt password
            //TODO: JWT <--- para generar la autenticacion del usuario
            //TODO: Email de confirmacion

            return {
                user: rest,
                token: 'ABC'
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }
}