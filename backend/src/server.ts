import app from './app.js';
import { PORT } from './config/env.js';
import { connectDB } from './helper/db.js';

connectDB().then(()=>{
  app.listen(PORT, ()=>{
    console.log("Server is running on port", PORT);
  })
});