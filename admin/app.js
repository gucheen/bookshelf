/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon('public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser({uploadDir: "public/tmp",keepExtensions: true}));
app.use(express.cookieParser('ck35sdxkMzba'));
app.use(express.cookieSession({ secret: '2HGYMRrrrx7R'}));
app.use(app.router);
app.use(express.static(__dirname + '/public'));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.authorize, routes.index);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/page/:page', routes.authorize, routes.index);
app.get('/add', routes.authorize, routes.add);
app.post('/add', routes.authorize, routes.doAdd);
app.get('/edit/:book', routes.authorize, routes.edit);
app.post('/edit/:book', routes.authorize, routes.doEdit);
app.get('/del/:book', routes.authorize, routes.del);
app.get('/pic', routes.authorize, routes.pic);
app.post('/pic', routes.authorize, routes.addPic);
app.get('/logout', function(req, res){
    req.session.view = null;
    res.redirect('/login');
})

var server = app.listen(3001, function() {
    console.log('Listening on port %d', server.address().port);
});
