import { envs } from "../../config"
import { CategoryModel, MongoDataBase, ProductModel, UserModel } from "../mongo"
import { seedData } from "./data"

(async()=>{
    await main()
})()

const randomBetween0AndX = (x: number) => {
    return Math.floor(Math.random() * x)
}

async function main(){
    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })
   
    // 0. Borrar todo
    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany()
    ])

    // 1. Crear usuarios
    const users = await UserModel.insertMany(seedData.users)

    // 2. Crear categorias
    const categories = await CategoryModel.insertMany(
        seedData.categories.map(category => {
            return {
                ...category,
                user: users[0]._id
            }
        })
    )

    // 3. Crear productos
    const products = await ProductModel.insertMany(
        seedData.products.map(product => {
            return {
                ...product,
                user: users[randomBetween0AndX(users.length - 1)].id, 
                category: categories[randomBetween0AndX(categories.length - 1)]._id
            }
        })
    )

    await MongoDataBase.disconnect()
}