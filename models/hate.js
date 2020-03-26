const mongoose = require('mongoose');

const hateSchema = new mongoose.Schema({
	area: String,
	desription: String
})

const Hate = mongoose.model('Hate', hateSchema);

module.exports = Hate;