const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.use(express.json());

router.get('/', async (request, response) => {
	const connect = await db.connect();
	const result = await connect.query("select id, name from users");
	connect.release();
	response.json(result.rows);
});

router.get('/:user_id', async (request, response) =>{
	const userID = request.params.user_id;
	const connect = await db.connect();
	const result = await connect.query("select id, name from users where id = $1", [userID]);
	connect.release();
	response.json(result.rows);
});

router.post('/', async (request, response) => {
	const userID = request.body.userID;
	const password = request.body.password;
	const name = request.body.name;
	const connect = await db.connect();
	const result = await connect.query("insert into users(id, password, name) values($1, $2, $3)", [userID, password, name]);
	connect.release();
	response.send(result);
});

router.put('/:user_id', async (request, response) => {
	const userID = request.params.user_id;
	const password = request.body.password;
	const name = request.body.name;
	const connect = await db.connect();
	const result = await connect.query("update users set password = $1, name = $2 where id = $3", [password, name, userID]);
	connect.release();
	response.send(result);
});

module.exports = router;