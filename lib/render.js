// start REMOVE THIS COMMENT

// This allows us to augment certain layout level pieces. It takes a single react component to render a page
// If we want to render multiple components, we just nest multiple react components inside of each other.
// This is an alternative to using a router on the react level. It allows us to structure our front end using a file structure.

// end REMOVE THIS COMMENT

'use strict';
var views = require('co-views');

var render = views('views', {
  map: {
    jade: 'jade'
  },
  default : 'jade'
});

//Container for all react components
var LAYOUT_NAME = 'ctr';

module.exports = function *(ctx, pageName, component, args){
  if(!args){
    args = {};
  }
  if(ctx.req && ctx.req.user){
    args.user = ctx.req.user;
  }
  args.component = yield ctx.react.renderComponentToString(component(args));
  return yield render(LAYOUT_NAME, {
    meta : args
  });
};


