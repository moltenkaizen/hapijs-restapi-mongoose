const WolvesController = require('./controllers/WolvesController');

module.exports = [
  { method: 'GET', path: '/api/wolves', config: {handler: WolvesController.showAll} },
  { method: 'GET', path: '/api/wolves/{name}', handler: WolvesController.showOne },
  { method: ['PUT', 'POST'], path: '/api/wolves/{name}', handler: WolvesController.create },
  { method: 'DELETE', path: '/api/wolves/{name}', handler: WolvesController.delete }
];

