import app from './app'
import mongoose from 'mongoose'
import config from './app/config'

async function main(){
    try{
        await mongoose.connect(config.db as string)
        app.listen(config.port,()=>{
            console.log(`port ${config.port} Listened Successfully`);
        })
    }
    catch(error){
        console.log('Database or Port Problem');
    }
}

