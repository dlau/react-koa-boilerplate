'use strict';
var koa = require('koa');
var koa_static = require('koa-static');
var debug = require('debug')('rbp:index');

var app = koa();

app.use(require('koa-logger')());
app.use(koa_static(__dirname + '/public'));
app.use(require('koa-body')());

//Transparently hooks the require for the .jsx extension
require('node-jsx').install({extension: '.jsx'});
var thunkify = require('thunkify');
var react = require('react');
var reactGen = {
  renderComponentToString : thunkify(
    function(component, callback){
      return callback(null, react.renderComponentToString(component));
    })
};

//Bind react to the middleware context, this is just for convenience
app.use(function*(next){
  this.react = reactGen;
  yield next;
});

//Don't use this in a production setting please, this is just for demonstration purposes
//Generally we will render everything out on top of a template
app.use(function*(next){
  if(this.url === '/' || this.url === ''){
    this.status = 200;
    this.body = [
                  '<html>',
                    '<div id="container">',
                    //renderComponentToString(require('front/js/lib/'))
                    //Add renderComponentToString here if you want server side rendering
                    '</div>',
                    '<script src="/assets/js/index.js" >',
                    '</script>',
                  '</html>'
                 ].join('\n');
  }
  else{
    yield next;
  }
});

app.use(function *(){
  this.status = 404;
  this.body = 'Not Found';
});

var port = process.env.NBP_PORT || 8001;
app.listen(port);
debug('Server Running on Port %d', port);
