import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import { dbConnection } from './utils/db.js';
import userRoutes from './routes/user.routes.js';
import companyRoutes from './routes/company.routes.js';
import jobRoutes from './routes/job.routes.js';
import applicantRoutes from './routes/applicants.routes.js'

const app = express();

// middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST','PUT','DELETE'],
    credentials:true,
    
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));


// APIs
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/company',companyRoutes);
app.use('/api/v1/job',jobRoutes);
app.use('/api/v1/application',applicantRoutes);



const port = process.env.PORT || 4000;
app.listen(port,()=>{
    dbConnection()
    console.log(`Server is Running on ${port} port`)
});