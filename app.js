var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');

var routes = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var doRegister = require('./lib/doRegister');
var login = require('./routes/login');
var doLogin = require('./lib/doLogin');
var logout = require('./lib/logout');
var messages = require('./lib/messages');
var user = require('./lib/middleware/userMiddleware');
var listEntries = require('./routes/listEntries');
var addEntries = require('./routes/addEntries');
var doAddEntries = require('./lib/doAddEntries');
var validation = require('./lib/middleware/validation');
var page = require('./lib/middleware/page');
var Entry = require('./lib/entry');

var api = require('./routes/restful/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cookieParser('your secret here'));
app.use(session({
  secret:'your secret here',
  resave:true,
  saveUninitialized:true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api',api.auth);
app.use('/api/user/:name',api.user);
app.post('/api/entry',doAddEntries);
app.use('/api/entries/',page(Entry.getTotal,2),api.entries);
app.use(user);
app.use(messages);
app.use('/',page(Entry.getTotal,2),listEntries);
app.use('/users', users);
app.use('/register', register);
app.post('/register', doRegister);
app.use('/login',login);
app.post('/login',doLogin);
app.use('/logout',logout);
app.use('/post',addEntries);
app.post('/post',
  validation.required('entry[title]'),
  validation.lengthAbove('entry[title]',4),
  validation.required('entry[body]'),
  validation.lengthAbove('entry[body]',10),
  doAddEntries);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
