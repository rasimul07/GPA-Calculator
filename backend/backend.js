const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000
const cors = require('cors');
app.use(express.json());
app.use(cors());

const userRouter = require('./routes/user');
app.use('/user', userRouter);


mongoose.connect('mongodb+srv://rasimulislam722:eRE8r3Rq3CBHhxRK@cluster0.khqazcv.mongodb.net/gpa', { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})