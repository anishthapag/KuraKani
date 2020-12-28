//Validation for user
'use strict'
module.exports = function(){
    return {
        signUpValidation : (req,res, next) => {
            req.checkBody('username', 'Please enter Username').notEmpty();
            
            req.checkBody('username', 'Username entered must not be less than 7 character').isLength({min:7});
            req.checkBody('email', 'Pleas enter Email').notEmpty();
            req.checkBody('email', 'Entered Email is Invalid!').isEmail();
            req.checkBody('password', 'Please enter the password').notEmpty();
            
            req.checkBody('password', 'Password entered must not be less than 7 character').isLength({min:7});

        } 
    }
}