const Wolf = require('./models/Wolf');
const boom = require('boom');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply('Hapi World!');
    }
  },
  {
    method: 'GET',
    path: '/api',
    handler: function (request, reply) {
      reply({'message': 'Hapi World!'});
    }
  },
  {
    method: 'GET',
    path: '/api/wolves',
    handler: function (request, reply) {
      Wolf.find(function (error, wolves) {
        if (error) {
          console.log(error);
        }
        reply(wolves);
      });
    }
  },
  {
    method: 'GET',
    path: '/api/wolves/{name}',
    handler: function (request, reply) {
      Wolf.find({name: request.params.name}, function (error, wolf) {
        if (error) {
          console.log(error);
        }
        reply(wolf);
      });
    }
  },
  {
    method: ['PUT', 'POST'],
    path: '/api/wolves/{name}',
    handler: function (request, reply) {
      const wolf = new Wolf({
        name: request.params.name
      });
      wolf.save(function(error, wolf) {
        if (error) {
          console.error(error);
        }

        reply(wolf.id);
      });
    }
  },
  {
    method: 'DELETE',
    path: '/api/wolves/{name}',
    handler: function (request, reply) {
      Wolf.findOneAndRemove({name: request.params.name}, (err, wolf) => {
        if (!wolf || err) {
          reply(boom.notFound('Cannot find that wolf to delete'));
        } else {
          reply(wolf.id).code(200);
        }
      });
    }
  }
];

