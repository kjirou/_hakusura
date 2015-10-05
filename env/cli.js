process.env.NODE_ENV = 'cli';
process.env.NODE_PATH = [
  __dirname + '/../client',
  __dirname + '/..'
].join(':');
require('module')._initPaths();

require('babel/register');
