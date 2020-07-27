const express= require('express');
const router= express.Router();
const passport= require('passport');

router.get('/signup',(req, res)=>{
    res.render('auth/signup');
});

/* router.post('/signup',(req, res)=>{
    console.log(req.body);
    passport.authenticate('local.signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    });
    res.send('Recibido logigin');
});  
 */
router.post('/signup', passport.authenticate('local.signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/profile',(req,res) => {
    res.send('Prfoles de user');
});
module.exports= router;