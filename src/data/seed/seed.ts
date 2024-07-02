import { envs } from "../../config"
import { MongoDataBase } from "../mongo"

(async()=>{
    await main()
})()

async function main(){
    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })
   
    // 1. Crear usuarios

    // 2. Crear categorias

    // 3. Crear productos

    await MongoDataBase.disconnect()
}