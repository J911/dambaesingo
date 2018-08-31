import App from './app'
import env from './environment/environment-handler'

const port = env.server.port || 3000;

const app = new App();
app.listen(port);
