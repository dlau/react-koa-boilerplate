/** @jsx React.DOM */
var React = require('react');

require('../style/index.less');

//Local Includes
var Body = require('./body');

//Workaround for chrome debugger plugin
window.React = React;

var container = document.getElementById('container');
React.renderComponent(<Body />, container);
