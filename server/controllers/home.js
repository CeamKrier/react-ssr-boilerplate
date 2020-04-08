import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import fs from 'fs';
import Config from '../config';

import App from '../../src/components/App';

const renderAppToString = () => {
	return ReactDOMServer.renderToString(<App />);
};

export const serveApp = (req, res) => {
	fs.readFile(path.resolve(Config.HTML_FILE_PATH), 'utf8', (err, data) => {
		if (err) {
			return res.status(500).send('Public folder could not accessed');
		}
		return res.send(
			data.replace(
				'<div id="root"></div>',
				`<div id="root">${renderAppToString()}</div>`
			)
		);
	});
};
