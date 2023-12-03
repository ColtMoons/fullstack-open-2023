const _ = require('lodash');

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const result = blogs.reduce((sum, item) => {
		return sum + item.likes;
	}, 0);

	return result;
};

const favoriteBlog = (blogs) => {
	const max = blogs.reduce((max, element) => {
		if (element.likes > max.likes) return element;
		return max;
	});

	return { title: max.title, author: max.author, likes: max.likes };
};

const mostBlogs = (blogs) => {
	const groups = _.groupBy(blogs, 'author');

	const objectArray = [];

	_.forIn(groups, (value, key) => {
		objectArray.push({ author: key, blogs: value.length });
	});

	const max = _.maxBy(objectArray, 'blogs');

	return { author: max.author, blogs: max.blogs };
};

const mostLikes = (blogs) => {
	const groups = _.groupBy(blogs, 'author');

	const objectArray = [];
	_.forIn(groups, (value, key) => {
		objectArray.push({ author: key, likes: totalLikes(value) });
	});

	return _.maxBy(objectArray, 'likes');

  
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
  mostLikes,
};
