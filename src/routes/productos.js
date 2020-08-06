const express= require('express');
const router= express.Router();

const pool = require('../database');

const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res)=>{
    res.render('products/add');
});

router.post('/add', isLoggedIn, async(req, res)=>{
const {correo_user,password_user,tipo_user,nombre_user,celular_user,direccion_user,ciudad_user,
    estrellas_user,estado_user}=req.body;
    const newprod={
        correo_user,
        password_user,
        tipo_user,
        nombre_user,
        celular_user,
        direccion_user,
        ciudad_user,
        estrellas_user,
        estado_user,  
       /*  id_user:req.user.id_user  */    
    };
    console.log(newprod);
    await pool.query('insert into producto set ?',[newprod]);
    req.flash('success','Usuario guardado correctamente');
    //res.send('Recibido');
    res.redirect('/links');  
});


router.get('/', async(req, res)=>{
    /* 'slect * from users WHERE id_user = ?' , [req.user.id_user] */
    const list_producto= await pool.query('SELECT * FROM producto');
    res.render('productos/list', {list_producto});
});

router.get('/delete/:id_prod', isLoggedIn, async(req, res)=> {
    const {id_user}= req.params;
    await pool.query('delete from producto WHERE id_prod= ?',[id_prod,]);
    req.flash('success','Producto eliminado correctamente');

    res.redirect('/productos');    
});

router.get('/edit/:id_prod', isLoggedIn, async (req, res)=>{
    const {id_prod}= req.params;
    const user= await pool.query('SELECT * FROM producto WHERE id_prod= ?',[id_prod]);
    console.log('user[0]');
    res.render('products/edit',{user:user[0]});
});

router.post('/edit/:id_prod', isLoggedIn, async(req,res)=>{
    const {id_prod}= req.params;
    const {correo_user,password_user,tipo_user,nombre_user,celular_user,direccion_user,ciudad_user,
        estrellas_user,estado_user}=req.body;
    const editprod={
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
    const edit= await pool.query('update producto set ? where id_prod= ?',[editprod,id_prod]);
    req.flash('success','Cambios se guardó correctamente');
    res.redirect('/products');
});

module.exports= router;