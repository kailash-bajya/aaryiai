var config = require('../knexfile');
var env ='production';
var knex = require('knex')(config[env]);
module.exports = knex;