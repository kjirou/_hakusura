process.env.NODE_ENV = 'test';
process.env.NODE_PATH = [
  __dirname + '/../client',
  __dirname + '/..'
].join(':');
require('module')._initPaths();

require('babel/register');

global.React = require('react');
