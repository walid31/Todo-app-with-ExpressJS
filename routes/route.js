module.exports = function (app, passport) {
    
    app.get('/', isLoggedIn, function (req,res) {
        console.log('req user', req.user);
        res.render('home',{user: req.user});
    });

    app.get('/signup', function (req,res) {
        res.render('signup');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successsRedirect: '/', 
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/logout', function (req,res) {
        req.logout();
        res.redirect('/');
    });

    function isLoggedIn(req,res,next) {
        if(req.isAuthenticated())
            return next();

        res.redirect('/login');    
    }
}