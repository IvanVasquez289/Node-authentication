import jwt from 'jsonwebtoken'

export class JwtAdapter {

    static async generateToken(payload: any, duration: string = "2h") {
        return new Promise((resolve, reject) => {
            jwt.sign(payload,"SEED", { expiresIn: duration }, (err, token) => {
                if(err) return resolve(null);
                resolve(token);
            })
        })
    }

    static validateToken(token: string) {

    }
}  