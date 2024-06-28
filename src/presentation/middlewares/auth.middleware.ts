import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongo";
import { UserEntity } from "../../domain";

export class AuthMiddleware {

    static async validateJWT(req:Request, res:Response, next: NextFunction){
        const authHeader = req.header('Authorization')
        if(!authHeader) return res.status(401).json({ error: 'Not token provided' })
        if(!authHeader?.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid bearer token'})

        const token = authHeader?.split(' ')[1] || ''

        try {
            const payload = await JwtAdapter.validateToken<{id: string}>(token)
            if(!payload) return res.status(401).json({ error: 'Invalid token' })

            const user = await UserModel.findById(payload?.id)
            if(!user) return res.status(401).json({ error: 'Invalid token - User not found' })
            
            //TODO: Validar si el usuario esta activo
            req.body.user = UserEntity.fromObject(user!)
            next()

        } catch (error) {
            console.log(error)
                res.status(500).json({ error: 'Internal server error' })
        }
       
    }
}