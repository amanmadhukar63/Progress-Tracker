import express from 'express';
import userRouter from './routes/user.route.js';

const app = express();

app.use('/api/user', userRouter);

app.get('/',(req,res)=>{
  res.send("Server is running");
});

export default app;