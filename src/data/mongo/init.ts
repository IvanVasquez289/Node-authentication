import mongoose from "mongoose";


interface ConnectionOptions {
    mongoUrl: string;
    dbName: string
}

export class MongoDataBase{
    static async connect(options:ConnectionOptions){
        const {mongoUrl,dbName} = options;
        
        try {
            await mongoose.connect(mongoUrl,{
                dbName: dbName
            })
            console.log('Mongo connected')
            return true
        } catch (error) {
            console.log('Mongo not connected')
            throw error
        }
    }

    static async disconnect(){
        await mongoose.connection.close()
    }
}