'use strict';
const { validationResult } = require("express-validator");

 

    module.exports = function(_, passport,UserValidation, validator){
     return {
         SetRouting: function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.get('/home', this.homePage);

            router.post('/', UserValidation.LoginValidation, this.postLogin);
            // router.post('/signup',UserValidation.SignUpValidation, this.postSignUp);
            router.post('/signup', [
                validator.check('username').not().isEmpty().isLength({min: 5})
                .withMessage('Enter Username, The name should atleast be 5 characters'),
                validator.check('email').not().isEmpty().isEmail()
                .withMessage('Entered Email is Invalid'),
                validator.check('password').not().isEmpty()
                .withMessage('Enter Password, The name should atleast be 5 characters'),
            ], this.postValidation, this.postSignUp);
         },

         indexPage: function(req,res){
            const errors = req.flash('error');
             return res.render('index', {title: 'KuraKani | Login', messages: errors, hasErrors: errors.length > 0});
         },
         postLogin: passport.authenticate('local.Login',{
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true
        }),
          
         getSignUp: function(req, res){
             const errors = req.flash('error');
             return res.render('signup', {title: 'KuraKani | SignUp', messages: errors, hasErrors: errors.length > 0});
         },

         postValidation: function(req,res, next){
            const err = validator.validationResult(req);
            console.log(err);
         },

         postSignUp: passport.authenticate('local.signup',{
             successRedirect: '/home',
             failureRedirect: '/signup',
             failureFlash: true
         }),
         homePage: function(req, res){
            return res.render('home'); 
         }
     }
}