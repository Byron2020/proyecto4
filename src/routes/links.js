const express= require('express');
const router= express.Router();

const pool = require('../database');

router.get('/add',(req, res)=>{
    res.render('links/add');
});

router.post('/add',async(req, res)=>{
const {correo_user,password_user,tipo_user,nombre_user,celular_user,direccion_user,ciudad_user,
    estrellas_user,estado_user}=req.body;
    const newuser={
        correo_user,
        password_user,
        tipo_user,
        nombre_user,
        celular_user,
        direccion_user,
        ciudad_user,
        estrellas_user,
        estado_user        
    };
    console.log(newuser);
    await pool.query('insert into users set ?',[newuser]);
    req.flash('success','Usuario guardado correctamente');
    //res.send('Recibido');
    res.redirect('/links');  
});

router.get('/',async(req, res)=>{
    const list_users= await pool.query('SELECT * FROM users');
    res.render('links/list', {list_users});
});


router.get('/delete/:id_user', async(req, res)=> {
    const {id_user}= req.params;
    await pool.query('delete from users WHERE id_user= ?',[id_user,]);
    req.flash('success','Usuario eliminado correctamente');

    res.redirect('/links');    
});

router.get('/edit/:id_user', async (req, res)=>{
    const {id_user}= req.params;
    const user= await pool.query('SELECT * FROM users WHERE id_user= ?',[id_user]);
    console.log('user[0]');
    res.render('links/edit',{user:user[0]});
});

router.post('/edit/:id_user',async(req,res)=>{
    const {id_user}= req.params;
    const {correo_user,password_user,tipo_user,nombre_user,celular_user,direccion_user,ciudad_user,
        estrellas_user,estado_user}=req.body;
    const edituser={
            correo_user,
            password_user,
            tipo_user,
            nombre_user,
            celular_user,
            direccion_user,
            ciudad_user,
            estrellas_user,
            estado_user        
    };
    const edit= await pool.query('update users set ? where id_user= ?',[edituser,id_user]);
    req.flash('success','Cambios se guardó correctamente');
    res.redirect('/links');
});

module.exports= router;