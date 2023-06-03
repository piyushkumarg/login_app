import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

/**middlewares */
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powered-by') //less hacker know about our hack

const port = 8000  

/**HTTP GET Request */
app.get('/', (req,res)=>{
    res.status(201).json("Home GET Request")
})

/** api routes */
app.use('/api',router)


/**Start Server only when we haive valid connection*/
connect().then(()=>{
    try{
        app.listen(port, () => {
          console.log(`server conected to http://localhost:${port}`);
        });
    }catch(error){
        console.log('cannot connect to the server')
    }
}).catch(error =>{
    console.log("Invalid database connection...!")
})

