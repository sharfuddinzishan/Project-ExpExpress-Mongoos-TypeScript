import app from './app'
import {Server} from 'http'

const Port=4000
let server:Server

const bootstrap=async()=>{
    server=app.listen(Port,()=>{
        console.log(`port ${Port} Listened Successfully`);
    })
}

bootstrap()
