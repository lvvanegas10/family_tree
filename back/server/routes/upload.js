const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const { verificaToken } = require('../middlewares/authentication');

app.use(fileUpload());

app.put('/upload/:key', verificaToken, function (req, res) {

    let nodeKey = req.params.key
    if (!req.files)
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'File upload error'
                }
            });

    let file = req.files.imageFile;
    let nameFile = file.name.split('.');
    let ext = nameFile[nameFile.length - 1];
    let validExt = ['png', 'jpg', 'gif', 'jpeg', 'PNG'];


    let newName = `${req.user._id}-${nodeKey}.${ext}`

    if (validExt.indexOf(ext) < 0) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'Invalid extension file.'
                }
            });
    }

    file.mv(`server/uploads/${newName}`, (err) => {
        if (err)
            return res.status(400)
                .json({
                    ok: false,
                    err
                });

        res.json({
            ok: true,
            message: 'File uploaded'
        })
    });
});

module.exports = app;