// Ignores the style imports while renderin on the node environment
require('ignore-styles');

// Registers necessary babel transpilers
require('@babel/register')({
	ignore: [/(node_modules)/],
	presets: ['@babel/preset-env', '@babel/preset-react'],
});

/**
 * Registering the required transpilers and running the server
 * from the same file is failing. Thus, invoking the server from here.
 */
require('./server');
