// ============================
//  Port
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  ENV
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  DB
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/tree';
} else {
    //CREAR LA VARIABLE DE ENTONRNO EN HEROKU PARA NO SUBIR ESTO
    urlDB ='mongodb://tree-user:proyectoWeb2018@ds255262.mlab.com:55262/tree'
    // urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;