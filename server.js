const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const container = require('./container');

container.resolve(function(users){
    const app = SetupExpress();
    function SetupExpress(){
        const app = express();
        const server = http.createServer(app);
        server.listen(3000, function(){
            console.log('Listening to port No 3000');
        });

    ConfigureExpress(App);

          //Router Setup
    const router = require('express-promise-router')();
    users.SetRouting(router);
    app.use(router);
    }
  


    function Configuration(app){
        app.use(express.static('public'));
        app.set('view engine', 'ejs');
        app.use(bodyparser.json());
        app.use(bodayParser.urlencoded({extended: true}));
    }    

});