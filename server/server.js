import path from 'path';
import compression from 'compression';
import express from 'express';
import HomeRoute from './routes/home';
import Config from './config';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(compression());

/**
 * index.html file presents inside the build folder.
 * When the browser sees it, it directly renders the page with the content inside of it.
 * That prevents routes to getting triggered.
 * Thus, `{ index: false }` option prevents the share of the file and routes will get triggered.
 *
 * `disable('x-powered-by')` hides the technology used on our server. Some says that prevents
 * 	attackers to obtain necessary info. Not sure, but fine to add. I took that from the source
 *  code of the Razzle.
 */
app
	.disable('x-powered-by')
	.use('/style', express.static(path.resolve(Config.CSS_FILE_PATH)))
	.use(express.static(path.resolve(Config.BUILD_FOLDER_PATH), { index: false }))
	.get('/', HomeRoute);

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
});
