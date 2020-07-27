const mysql = require('mysql');
const {promisify}= require('util');

const { database }= require('./keys');

const pool= mysql.createPool(database);

pool.getConnection((err, connecttion)=>{
    if(err){
        if(err.code=== 'PROTOCOL_CONNECTION_LOST'){
            console.error('Conexion de Db Cerrada');
        }
        if(err.code=== 'ER_CON_COUNT_ERROR'){
            console.error('BASE DE DATOS tiene demasiadas conexiones');
        }
        if(err.code=== 'ENCONNREFUSED'){
            console.error('CONEXION BASE DE DATOS fue rechazada'); 
        }
    }
    if(connecttion) connecttion.release();
    console.log('Conexion con la DB correcto');
    return;
});

pool.query= promisify(pool.query);

module.exports= pool;
