import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { AuthService } from "../services/auth-service";
import { CustomError } from "../../domain";

export class AuthController {
    constructor(
        public readonly authService: AuthService
    ){}

    private handleError = (error: any, res: Response) => {
        if(error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message })
        }

        console.log(error) // No esperamos que esto suceda, pero si hay un error veremos que es
        res.status(500).json({ error: 'Internal server error' })
    }

    public registerUser = (req: Request,res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        if(error) return res.status(400).json({ error })
        this.authService.registerUser(registerUserDto!)
            .then((data) => res.json(data))
            .catch((error) => this.handleError(error, res))
           
              
    }

    public loginUser = (req: Request,res: Response) => {
        res.json('loginUser');
    }

    public validateEmail = (req: Request,res: Response) => {
        res.json('validateEmail');
    }
}