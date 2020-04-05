import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/index.css';

ReactDOM.hydrate(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
