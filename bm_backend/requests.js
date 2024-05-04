const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.use(express.json());

router.get('/', async (request, response) => {
	const connect = await db.connect();
	const result = await connect.query("select id, summary, detail, progress, assignee, created, creator, updated, updator from requests");
	connect.release();
	response.json(result.rows);
});

router.get('/:request_id', async (request, response) => {
	const requestID = request.params.request_id;
	const connect = await db.connect();
	const result = await connect.query("select id, summary, detail, progress, assignee, created, creator, updated, updator from requests where id= $1", [requestID]);
	connect.release();
	response.json(result.rows);
});

router.post('/', async (request, response) => {
	const summary = request.body.summary;
	const detail = request.body.detail;
	const userID = request.body.userID;
	const connect = await db.connect();
	const result = await connect.query("insert into requests (summary, detail, creator, updator) values ($1, $2, $3, $3)", [summary, detail, userID]);
	connect.release();
	response.send(result);
});

router.put('/:request_id', async (request, response) => {
	const requestID = request.params.request_id;
	const summary = request.body.summary;
	const detail = request.body.detail;
	const progress = request.body.progress;
	const assignee = request.body.assignee;
	const userID = request.body.userID;
	const connect = await db.connect();
	const result = await connect.query("update requests set summary=$1, detail=$2, progress=$3, assignee=$4, updated=CURRENT_TIMESTAMP, updator=$5 where id=$6", [summary, detail, progress, assignee, userID, requestID]);
	connect.release();
	response.send(result);
});

router.get('/:request_id/messages', async (request, response) => {
	const requestID = request.params.request_id;
	const connect = await db.connect();
	const result = await connect.query("select id, request_id, message, created, creator, updated, updator from requests_message where request_id=$1 order by created", [requestID]);
	connect.release();
	response.json(result.rows);
});

router.get('/:request_id/messages/:message_id', async (request, response) => {
	const messageID = request.params.message_id;
	const connect = await db.connect();
	const result = await connect.query("select id, request_id, message, created, creator, updated, updator from requests_message where id=$1 order by created", [messageID]);
	connect.release();
	response.json(result.rows);
});

router.post('/:request_id/messages', async (request, response) => {
	const requestID = request.params.request_id;
	const message = request.body.message;
	const userID = request.body.userID;
	const connect = await db.connect();
	const result = await connect.query("insert into requests_message (request_id, message, creator, updator) values ($1, $2, $3, $3)", [requestID, message, userID]);
	connect.release();
	response.send(result);
});

router.put('/:request_id/messages/:message_id', async (request, response) => {
	const messageID = request.params.message_id;
	const message = request.body.message;
	const userID = request.body.userID;
	const connect = await db.connect();
	const result = await connect.query("update requests_message set message=$1, updated=CURRENT_TIMESTAMP, updator=$2 where id=$3", [message, userID, messageID]);
	connect.release();
	response.send(result);
});

module.exports = router;