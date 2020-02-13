const express = require('express');
const ExpressError = require('./errors');
const app = express();
const itemsRoutes = require('./items-routes');

app.use(express.json());
app.use('/items', itemsRoutes);

module.exports = app;


