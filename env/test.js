process.env.NODE_ENV = 'test';
process.env.NODE_PATH = [
  __dirname + '/../client',
  __dirname + '/..'
].join(':');
require('module')._initPaths();

require('babel/register');

global.React = require('react');

var keypress = require('keypress');
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();
