
require('dotenv').config();
const express = require("express");


const app = express();
const PORT = 3000;
const mongoose = require("mongoose");


app.use(express.json());

app.get('/test', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);

    res.json("database is connected to the server")
})

app.listen(PORT, () => {
    console.log(`ApnaCourse Server is listening to the port ${PORT}`);
})