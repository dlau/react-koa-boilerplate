/** @jsx React.DOM */
var React = require('react');

var Body = React.createClass({
  getInitialState : function(){
    return {
    };
  },
  render : function(){
    return (
      <div>
        Hello World!
        <br />
        I am located at front/js/body.jsx
      </div>
    );
  }
});

module.exports = Body;
