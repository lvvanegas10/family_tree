const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const { verificaToken } = require('../middlewares/authentication');

app.get('/image/:key', verificaToken, (req, res) => {

    let id = req.user._id;
    let nodeKey = req.params.key;
    let validExt = ['png', 'jpg', 'gif', 'jpeg', 'PNG'];

    let pathImg = `../uploads/${id}-${nodeKey}.`;

    let finalPath = path.resolve(__dirname, '../assets/default.png');

    for (ext in validExt) {
        let pathAbsolute = path.resolve(__dirname, pathImg + validExt[ext]);
        if (fs.existsSync(pathAbsolute)) {
            finalPath = pathAbsolute;
        }
    }
    res.sendFile(finalPath);

});

module.exports = app;
