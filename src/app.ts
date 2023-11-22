import express, { NextFunction, Request, Response } from 'express'

const app = express()

app.use(express.json())
app.use(express.text())

const logger=((req:Request,res:Response,next:NextFunction)=>{
    console.log('Logger');
    next()
})

app.get('/',logger,(req:Request,res:Response)=>{
    console.log('API Connected');
    res.send('Everything Worked Fine.')
})

app.all('**',(req:Request,res:Response)=>{
    res.status(400).json({
        message:'No Such Link Exist',
        success:false
    })
})

export default app