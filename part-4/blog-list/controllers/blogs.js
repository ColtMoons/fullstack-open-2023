const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

blogRouter.post('/', (request, response, next) => {
	const { title, author, url, likes } = request.body;
	const blog = new Blog({ title, author, url, likes });

	blog
		.save()
		.then((savedBlog) => {
			response.json(savedBlog);
		})
		.catch((error) => next(error));
});

module.exports = blogRouter;
