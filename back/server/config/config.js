// ============================
//  Port
// ============================
process.env.PORT = process.env.PORT || 3001;


// ============================
//  ENV
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


// ============================
//  DB
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/tree';
} else {
    urlDB = process.env.MONGO_URL;
}
process.env.URLDB = urlDB;

// ============================
//  Google Client ID
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '737491737196-blinmg8mvr94vop8doak9sq6v2u9gglq.apps.googleusercontent.com';