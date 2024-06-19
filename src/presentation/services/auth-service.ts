import { BcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongo";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email-service";

export class AuthService {
    constructor(
        private readonly emailService : EmailService
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
           
           
            //TODO: Email de confirmacion
            await this.sendEmailValidationLink(user.email)

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

    private async sendEmailValidationLink(email: string) {
        const token = await JwtAdapter.generateToken({email: email})
        if(!token) throw CustomError.internalServer('Error generating token');

        const url = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`
        const html = `
            <h1>Validate your email</h1>
            <p>Click the link below to validate your email</p>
            <a href="${url}">Validate your email ${email}</a>
        `
        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html
        }

        const isSent = await this.emailService.sendEmail(options)
        if(!isSent) throw CustomError.internalServer('Error sending email');

        return true
    }

    public async validateEmail(token: string) {
        const payload = await JwtAdapter.validateToken(token)
        if(!payload) throw CustomError.unathorized('Invalid token');

        const {email} = payload as {email: string}
        if(!email) throw CustomError.internalServer('Email not in token');

        const user = await UserModel.findOne({email})
        if(!user) throw CustomError.internalServer('User not found');

        user.emailValidated = true;
        await user.save();
        return true

    }
}