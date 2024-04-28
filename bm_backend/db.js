const { Pool } = require('pg');

const pool = new Pool({
	user: "bluemarine",
	password: "bluemarine",
	host: "localhost",
	database: "bluemarine",
	port: "5432",
	max: 10
});

module.exports = pool;