import { BcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongo";
import { CustomError, LoginUserDto, UserEntity } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";

export class AuthService {
    constructor(

    ){}

    public async registerUser(registerUserDto: RegisterUserDto) {
        const existsUser = await UserModel.findOne({ email: registerUserDto.email });
        if(existsUser) throw CustomError.badRequest('User already exists');
        
        try {
            const user = await UserModel.create(registerUserDto)
            user.password = BcryptAdapter.hash(registerUserDto.password)

            await user.save()
            
            const userEntity = UserEntity.fromObject(user)
            const {password, ...rest} = userEntity;
           
            //TODO: JWT <--- para generar la autenticacion del usuario
            //TODO: Email de confirmacion

            const token = await JwtAdapter.generateToken({id: user.id})
            if(!token) throw CustomError.internalServer('Error generating token');

            return {
                user: rest,
                token: token
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    public async loginUser(loginUserDto: LoginUserDto) {
        const existsUser = await UserModel.findOne({ email: loginUserDto.email });
        if(!existsUser) throw CustomError.badRequest('Email not exists');

        const isPasswordValid = BcryptAdapter.compare(loginUserDto.password, existsUser.password)
        if(!isPasswordValid) throw CustomError.badRequest('Password not valid');

        const userEntity = UserEntity.fromObject(existsUser)
        const {password, ...rest} = userEntity;

        //TODO: JWT <--- para generar la autenticacion del usuario
        const token = await JwtAdapter.generateToken({id: existsUser.id})
        if(!token) throw CustomError.internalServer('Error generating token');

        return {
            user: rest,
            token: token,
        }
    }
}