const express = require('express')
require('./db/mongoose');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();



//Post işleminde gönderdiğimiz params json olarak kullanılmasını sağlar
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app;
