var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config/index');
var session = require('express-session')
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var mongoose = require('./libs/mongoose');
var MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(require('./middlewares/loadParty'));
app.use(require('./middlewares/loadUser'));
app.use(require('./middlewares/loadParties'));
routes(app);

app.use(function(err, req, res, next) {
  var errMessage = ''
    if (err == 401){
      errMessage = 'Ошибка! Вы не авторизованы.'
    };
    if (err == 403){
      errMessage = 'Ошибка! Данная операция невозможна.'
    }

        res.render('error', {
          message: errMessage
        });
  // }  
});

 

http.createServer(app).listen(config.get('port'), function() {
    console.log('Express is listening on port ' + config.get('port'));
});


module.exports = app;
