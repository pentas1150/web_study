const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const passport = require('passport');
require('dotenv').config();

const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const mainRouter = require('./routes/main');
const videoplayRouter = require('./routes/videoplay');
const uploadRouter = require('./routes/upload');
const adminRouter = require('./routes/admin');

const connect = require('./schemas');
const passportConfig = require('./passport');

const app = express();
connect();
passportConfig(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', loginRouter);
app.use('/signup', signupRouter);
app.use('/main', mainRouter);
app.use('/videoplay', videoplayRouter);
app.use('/upload', uploadRouter);
app.use('/admin', adminRouter);

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
