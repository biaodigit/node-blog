var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var RedisStore = require('connect-redis')(session)
var redisClient = require('./db/redis.js')

// var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var blogRouter = require('./routes/blog');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

var sessionStore = new RedisStore({
    client: redisClient
})

app.use(session({
    secret: 'WJiol_8776#',
    cookie: {
        // path: '/',
        // httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
}))

// app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
