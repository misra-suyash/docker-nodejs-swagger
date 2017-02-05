const express = require('express');
const path = require('path');
const swaggerDoc = require('./swagger.json');
const swaggerTools = require('swagger-tools');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.use((err, req, res, next) => {
  console.log(err);
  if (err.failedValidation) {
    console.log(err.results);
    res.status(400).json({ message: err.message, results: err.results });
  } else {
    res.status(500).json({ message: err.message });
  }
  next();
});

swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator({
    validateResponse: true,
  }));
  app.use(middleware.swaggerRouter({
    controllers: path.join(__dirname, 'routes/'),
  }));
  app.use(middleware.swaggerUi());

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
});
