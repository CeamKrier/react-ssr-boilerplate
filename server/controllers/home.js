import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import fs from 'fs';
import Config from '../config';

import App from '../../src/components/App';

const DEV_MODE = process.argv.includes('SSR');

const renderAppToString = () => {
	return ReactDOMServer.renderToString(<App />);
};

export const serveApp = (req, res) => {
	fs.readFile(path.resolve(Config.HTML_FILE_PATH), 'utf8', (err, data) => {
		if (err) {
			return res.status(500).send('Public folder could not accessed');
		}
		let updatedData = data;
		if (DEV_MODE) {
			// add css file in the dev mode, only needed in dev mode
			updatedData = data.replace(
				'</head>',
				'<link rel="stylesheet" type="text/css" href="/style"/></head>'
			);
		}
		return res.send(
			updatedData.replace(
				'<div id="root"></div>',
				`<div id="root">${renderAppToString()}</div>`
			)
		);
	});
};
