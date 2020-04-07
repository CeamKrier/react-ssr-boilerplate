import path from 'path';
import fs from 'fs';
import compression from 'compression';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../src/components/App';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(compression());

const serverRenderer = (req, res, next) => {
	fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
		if (err) {
			console.error(err);
			return res.status(500).send('An error occurred');
		}
		return res.send(
			data.replace(
				'<div id="root"></div>',
				`<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
			)
		);
	});
};

app.get('/', serverRenderer);

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
});
