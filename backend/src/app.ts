import express from 'express';
import userRouter from './routes/user.route.js';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
  credentials: true,
}));
// app.options('*', cors());
app.use(express.json());

app.use('/api/user', userRouter);

app.get('/',(req,res)=>{
  res.send("Server is running");
});

export default app;