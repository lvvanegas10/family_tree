const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Tree = require('../models/tree');

const app = express();

const { verificaToken, verificaAdmin_Role } = require('../middlewares/authentication')

// I advise you to use the correct convention of a conditional statement. Use if, else if and else instead of making the returns.
// Use that for the get, the put and the post.

app.get('/tree', [verificaToken], function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    Tree.find({ id: req.user._id }, 'tree')
        .exec((err, trees) => { 
        
            if (trees === undefined) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'User do not have a tree'
                    }
                });
            }

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                trees
            });

        });
});

app.post('/tree', [verificaToken], function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // I don´t understand why you ask for a body in the request if you do not use it later.
    let body = req.body;
    let id = req.user._id;

    let tree = new Tree({
        id,
        tree: []
    });

    tree.save((err, treeDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            tree: treeDB
        });
    });

});

app.put('/tree', [verificaToken], function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    let body = _.pick(req.body, ['tree']);


    Tree.findOneAndUpdate({ id: req.user._id }, body, { new: true, runValidators: true, context: 'query' }, (err, treeDB) => {
        if (!treeDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            });
        }

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            tree: treeDB
        });
    })
});


module.exports = app;
