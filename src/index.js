const fastify = require("fastify")({
    logger: true
});

// const cors = require('cors')

const userRoutes = require('./routes/users.rotes');
// const swagger = require("./utils/swagger")

require('./utils/mongoose');
;
// Habilitar CORS
// fastify.register(require('cors'), { 
//     origin: '*', // Ajusta esto según sea necesario
// });



// fastify.register(require('fastify-swagger'), swagger.options);

fastify.get("/", (request, reply) => {
    reply.send({hello: 'world'});
});



userRoutes.forEach(route =>{
    fastify.route(route);
});

const start = async () => {
    await fastify.listen({port:3000})
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
};

start()