const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');

// Agrega solo los middlewares necesarios (sin servir archivos estáticos)
const middlewares = [
  jsonServer.bodyParser,
  jsonServer.defaults({ noCors: false, logger: true })
];

middlewares.forEach(mw => server.use(mw));

server.use(router);

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
