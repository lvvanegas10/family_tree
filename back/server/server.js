require('./config/config');

const express = require('express');
const mongoose = require('mongoose');


const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json())


app.use(require('./routes/index'));

// PRUEBA GOOGLE
const path = require('path');
app.use(express.static(path.resolve(__dirname, '../public')));


mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('BD online');
});



app.listen(process.env.PORT, () => {
    console.log('Listening to port: ', process.env.PORT);
});