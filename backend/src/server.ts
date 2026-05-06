import app from './app.js';
import { PORT } from './config/env.js';
import client from './helper/db.js';
import { createUserTable } from './models/user.model.js';

client.connect()
.then(()=>{
  app.listen(PORT, ()=>{
    client.query(createUserTable);
    console.log("Server is running on port", PORT);
  })
})
.catch((err)=> {
  console.error('Error in db connection:', err);
});