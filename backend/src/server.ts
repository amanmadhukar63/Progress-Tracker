import app from './app.js';
import { PORT } from './config/env.js';
import client from './helper/db.js';
import { createGoalTable } from './models/goal.model.js';
import { createTaskTable } from './models/task.model.js';
import { createTaskLogTable } from './models/taskLog.model.js';
import { createUserTable } from './models/user.model.js';

async function createTables() {
  await client.query(createUserTable);
  await client.query(createGoalTable);
  await client.query(createTaskTable);
  await client.query(createTaskLogTable);
}

client.connect()
.then(()=>{
  app.listen(PORT, ()=>{
    createTables();
    console.log("Server is running on port", PORT);
  })
})
.catch((err)=> {
  console.error('Error in db connection:', err);
});