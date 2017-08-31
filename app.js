const Hapi = require('hapi');
const server = new Hapi.Server();
const db = require('./database').db;
const Wolf = require('./models/Wolf');
const routes = require('./routes');

server.connection({
  host: 'localhost',
  port: 4000
});

server.route(routes);

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});