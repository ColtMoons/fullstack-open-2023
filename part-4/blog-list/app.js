const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const middlewares = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogs');

mongoose.set('strictQuery', false);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to Mongo db');
	})
	.catch((error) => {
		logger.error('error conecting to MongoDB', error.message);
	});

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);

app.use(middlewares.errorHandler);
app.use(middlewares.errorHandler)

module.exports = app