const Wolf = require('../models/Wolf');
const boom = require('boom');

const wolvesController = function () {
  return {
    create: function (request, reply) {
      const wolf = new Wolf({
        name: request.params.name
      });
      wolf.save(function (error, wolf) {
        if (error) {
          console.error(error);
        }
        reply(wolf);
      });
    },
    showAll: function (request, reply) {
      Wolf.find(function (error, wolves) {
        if (error) {
          console.log(error);
        }
        reply(wolves);
      });
    },
    showOne: function (request, reply) {
      Wolf.find({name: request.params.name}, function (error, wolf) {
        if (!wolf) {
          reply(boom.notFound('wolf not found'));
        } else {
          reply(wolf).code(200);
        }
      });
    },
    delete: function (request, reply) {
      Wolf.findOneAndRemove({name: request.params.name}, (error, wolf) => {
        if (!wolf || error) {
          reply(boom.notFound('wolf not found'));
        } else {
          reply(wolf.id).code(200);
        }
      });
    }
  }
}();

module.exports = wolvesController;