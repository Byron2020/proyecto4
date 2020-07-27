const passport= require('passport');

const LocalStrategy= require('passport-local').Strategy;
const helpers= require('../lib/helpers');

const pool = require('../database');

passport.use('local.singup', new LocalStrategy({
    usernameField: 'nombre_user',
    passwordField: 'password_user',
    passReqToCallback: true
}, async(req, nombre_user, password_user, done)=> {
    
    console.log(req.body);
    /* const {correo_user}= req.body;
    const newUser={
        nombre_user,
        correo_user,
        password_user
    };
    newUser.password_user= await helpers.encryptPassword(password_user);
    const result= await pool.query('INSERT INTO users set ?', [newUser]);
    await pool.query('insert into user set ?', [newUser]);
    console.log(result); */
}));

/* passport.serializeUser((user, done)=>{
    DelayNode(null, user.id);
}); */


