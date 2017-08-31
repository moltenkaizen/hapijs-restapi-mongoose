const Wolf = require('./models/Wolf');

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
          reply(wolf).code(404);
        } else {
          reply(wolf.id).code(200);
        }
      });
    }
  }
];

