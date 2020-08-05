const passport= require('passport');
const LocalStrategy= require('passport-local').Strategy;
const pool = require('../database');
const helpers= require('./helpers');

passport.use('local.signup', new LocalStrategy({
    usernameField: 'correo_user',
    passwordField: 'password_user',
    passReqToCallback: true
}, async(req, correo_user, password_user, done)=> {
    const newUser={ 
        correo_user,
        password_user
    };
    newUser.password_user= await helpers.encryptPassword(password_user);
    const result= await pool.query('insert into users set ?', [newUser]);
    newUser.id_user=result.insertId;
    return done(null,newUser);
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'correo_user',
    passwordField: 'password_user',
    passReqToCallback: true
}, async(req, correo_user, password_user, done)=>{
    console.log(req.body);
    const rows = await pool.query('select * from users where correo_user= ?',[correo_user]);
    if(rows.length> 0){
        const user= rows[0];
        const valid= await helpers.matchPassword(password_user, user.password_user);
        if(valid){
            done(null, user, req.flash('success', 'Bien venido' + user.correo_user));
        }else{
            done(null, false, req.flash('message', 'Datos incorrectos: '+ user.password_user));
        }
    }else{
        return done(null, false, req.flash('message', 'Usuario no existe'));
        //return done(null, false, req.flash('message', 'The Username does not exists.'));
    }

}));

passport.serializeUser((user, done)=>{
    done(null, user.id_user);
}); 

passport.deserializeUser(async(id_user, done)=>{
    const rows= await pool.query('select * from users where id_user = ?' , [id_user]);
    done(null, rows[0]);
});