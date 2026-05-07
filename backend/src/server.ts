import app from './app.js';
import { PORT } from './config/env.js';
import client from './helper/db.js';
import { createGoalTable } from './models/goal.model.js';
import { createTaskTable } from './models/task.model.js';
import { createTaskLogTable } from './models/taskLog.model.js';
import { createUserTable } from './models/user.model.js';

client.connect()
.then(()=>{
  app.listen(PORT, ()=>{
    client.query(createUserTable);
    client.query(createTaskLogTable);
    client.query(createTaskTable);
    client.query(createGoalTable);
    console.log("Server is running on port", PORT);
  })
})
.catch((err)=> {
  console.error('Error in db connection:', err);
});