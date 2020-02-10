var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var SessionStore = require('connect-mongodb-session')(session);
var flash = require('connect-flash');
var logger = require('morgan');
var homeRouter = require('./routes/home-router');
var productRouter = require('./routes/product-route');
var authRouter = require('./routes/auth.router');
var usersRouter = require('./routes/users');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
var   STORE=new SessionStore({
  uri:'mongodb://localhost:27017/online-shop',
  collection:'sessions'
})
app.use(session({
  secret:'this is my secret to hash express session',
  saveUninitialized:false,
  store:STORE

}))
app.use(flash());
app.use('/', homeRouter);
app.use('/product', productRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
