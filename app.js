const express = require('express');
const ExpressError = require('./errors');

const app = express();
const itemsRoutes = require('./items-routes');

app.use(express.json());
app.use('/items', itemsRoutes);

app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not found", 404);
  return next(notFoundError);
})

app.use(function (err, req, res) {
  // Return error if error
  let status = err.status || 500;
  let message = err.message;

  // Set the status and alert the user
  return res.status(status).json({
    error: {
      message,
      status
    }
  })
})

module.exports = app;