const express = require('express');

const app = express();

app.use(require('./user'));
app.use(require('./login'));
app.use(require('./tree'));
app.use(require('./upload'));
app.use(require('./image'));


module.exports = app;