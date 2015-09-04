process.env.NODE_ENV = 'development';
process.env.NODE_PATH = [
  __dirname + '/../client',
  __dirname + '/..'
].join(':');
require('module')._initPaths();

require('babel/register');

var React = require('react');
global.React = React;
global.Arda = require('arda');
