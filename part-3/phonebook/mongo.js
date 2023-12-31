const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('give a password');
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://coltmoonsac:${password}@phonebook.75zg2a7.mongodb.net/phonebookapp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
	const name = process.argv[3];
	const number = process.argv[4];
	const person = new Person({
		name,
		number,
	});

	person.save().then((result) => {
		console.log(`added ${result.name} number ${result.number} to phonebook`);
		mongoose.connection.close();
	});
}

if (process.argv.length === 3) {
	Person.find({}).then((persons) => {
		console.log('Phonebook:');
		persons.forEach((person) => console.log(`${person.name} ${person.number}`));
		mongoose.connection.close();
	});
}

if (process.argv.length > 5 || process.argv.length === 4) {
	console.log('there are more args than expected');
	mongoose.connection.close();
}
