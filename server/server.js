import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

const app= express();
const port = process.env.PORT || 4000;
connectDB();

app.use(cors({
    origin: ['http://localhost:5173', 'https://toolsapp-finpro.vercel.app'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//API Endpoints
app.get('/', (req, res) => { res.send('API is working!'); });
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/todos', todoRoutes);

app.listen(port, () => {console.log(`Server started on PORT:${port}`);});