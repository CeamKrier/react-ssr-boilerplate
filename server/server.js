import path from 'path';
import compression from 'compression';
import express from 'express';
import HomeRoute from './routes/home';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(compression());

app
	.disable('x-powered-by')
	.use(express.static(path.resolve(__dirname, '..', 'build'), { index: false }))
	.get('/', HomeRoute);

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
});
