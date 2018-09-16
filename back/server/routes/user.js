const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');

const app = express();

const { verificaToken, verificaAdmin_Role } = require('../middlewares/authentication')

app.get('/users', [verificaToken, verificaAdmin_Role], function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    console.log(req.user.name);
    User.find({}, 'name email role state google img')
        .exec((err, users) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({}, (err, countVar) => {
                res.json({
                    ok: true,
                    users,
                    cuantos: countVar
                });
            });
        });
});

app.get('/users/:id', function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    let id = req.params.id;

    User.find({ _id: id }, 'name email role state google img')
        .exec((err, users) => {

            if (users===undefined) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'User not find'
                    }
                });
            }

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({ _id: id }, (err, countVar) => {
                res.json({
                    ok: true,
                    users,
                    count: countVar
                });
            });
        });
});

app.post('/users', function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            user: userDB
        });
    });

});

app.put('/users/:id', function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, userDB) => {

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not find'
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
            user: userDB
        });

    })

});

app.delete('/users/:id', function (req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    let id = req.params.id;

    let changeState = {
        state: false
    };

    User.findByIdAndUpdate(id, changeState, { new: true }, (err, userDelete) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!userDelete) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not find'
                }
            });
        }
        res.json({
            ok: true,
            user: userDelete
        });
    });
});



module.exports = app;