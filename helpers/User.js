//Validation for user
'use strict'
module.exports = function(){
    return {
        SignUpValidation : (req,res, next) => {
            req.checkBody('username', 'Please enter Username').notEmpty();
            req.checkBody('username', 'Username entered must not be less than 5 character').isLength({min:5});
            req.checkBody('email', 'Pleas enter Email').notEmpty();
            req.checkBody('email', 'Entered Email is Invalid!').isEmail();
            req.checkBody('password', 'Please enter the password').notEmpty();
            req.checkBody('password', 'Password entered must not be less than 5 character').isLength({min:5});

            req.getValidationResult()
                .then((result) => {
                const errors = result.array();
                const messages = [];
                errors.forEach((error) => {
                    messages.push(error.msg);
                });
                req.flash('error', messages);
                res.redirect('/signup');
            })
            .catch((err) =>{
                return next();
            })

        } 
    }
}