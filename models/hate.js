const mongoose = require('mongoose');

const hateSchema = new mongoose.Schema({
	area: String,
	description: String
})

const Hate = mongoose.model('Hate', hateSchema);

module.exports = Hate;