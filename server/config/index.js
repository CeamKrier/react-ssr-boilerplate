const DEV_MODE = process.argv.includes('SSR');

const Config = {
	HTML_FILE_PATH: DEV_MODE ? './public/index.html' : './build/index.html',
	BUILD_FOLDER_PATH: DEV_MODE ? './public' : './build',
	CSS_FILE_PATH: './src/styles/index.css',
};
export default Config;
