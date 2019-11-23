var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express();
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


require('dotenv').config();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var MONGODB_URI = process.env.MONGODB_URL;

mongoose.connect('MONGODB_URI',{ useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function () {
    console.log('connected');
});

app.use(session({secret: 'ilearnnodejs'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);
require('./routes/route')(app, passport);

var PORT = process.env.PORT;

app.listen(PORT, function () {
    console.log('app listening to port: ${PORT}');
});