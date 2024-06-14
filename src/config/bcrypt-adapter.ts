import {hashSync,compareSync,genSaltSync} from 'bcryptjs'
export class BcryptAdapter {

    static hash(password: string) {
        const salt = genSaltSync(10)
        return hashSync(password, salt)
    }

    static compare(password: string, hash: string) {
        return compareSync(password, hash)
    }
}