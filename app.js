const express = require('express');
const bodyparser = require('body-parser');
const db = require('./db');
const userRouter = require('./routes/userRoutes');
const notesRoute = require('./routes/noteRoutes');
require('dotenv').config();


const app = express();
app.use(bodyparser.json());




app.use('/user',userRouter);

app.use('/note',notesRoute);





const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log('server is running on port',PORT);
})