const jwt = require('jsonwebtoken');


// =====================
// Verificar Token
// =====================
let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Invalid token'
                }
            });
        }

        req.user = decoded.user;
        next();

    });



};

// =====================
// Verifica AdminRole
// =====================
let verificaAdmin_Role = (req, res, next) => {

    let user = req.user;

    if (user.role === 'USER_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'Access denied'
            }
        });
    }
};



module.exports = {
    verificaToken,
    verificaAdmin_Role
}