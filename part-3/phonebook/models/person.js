const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('connected to the database');
	})
	.catch((error) => {
		console.log('cannot connect with the database', error.message);
	});

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true,
	},
	number: {
		type: String,
		minlength: 8,
		validate: {
			validator: function (number) {
				return /^\d{2,3}-\d+$/.test(number);
			},
			message: (props) => `${props.value} is not a valid phone number`,
		},
		required: true,
	},
});

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Person', personSchema);
