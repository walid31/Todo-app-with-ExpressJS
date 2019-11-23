var localStrategy = require('passport-local').Strategy;

var User = require('../models/user.schema');

module.exports = function(passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id,done) {
        User.findById(id, function (err, user) {
            done(err,user);          
        });
    });

    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        process.nextTick(function () {
            User.findOne({'email': email}, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    var newUser= new User();
                    newUser.email = email;
                    newUser.password = newUser.generateHash(passport);
                    
                    newUser.save(function (err) {
                        if(err)
                         throw err;
                         return done(null, newUser);
                    });

                }
            });
        });
    }
    ));
}