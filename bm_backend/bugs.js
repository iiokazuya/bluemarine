const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.use(express.json());

router.get('/', async (request, response) => {
	const connect = await db.connect();
	const result = await connect.query("select id, summary, detail, repro, progress, assignee, created, creator, updated, updator from bugs");
	connect.release();
	response.json(result.rows);
});

router.get('/:bug_id', async (request, response) => {
	const bugID = request.params.bug_id;
	const connect = await db.connect();
	const result = await connect.query("select id, summary, detail, repro, progress, assignee, created, creator, updated, updator from bugs where id= $1",[bugID]);
	connect.release();
	response.json(result.rows);
});

router.post('/', async (request, response) => {
	const summary = request.body.summary;
	const detail = request.body.detail;
	const repro = request.body.repro;
	const userID = request.body.userID;
	const connect = await db.connect();
	const result = await connect.query("insert into bugs (summary, detail, repro, creator, updator) values ($1, $2, $3, $4, $4)", [summary, detail, repro, userID]);
	connect.release();
	response.send(result);
});

router.put('/:bug_id', async (request, response) => {
	const bugID = request.params.bug_id;
	const summary = request.body.summary;
	const detail = request.body.detail;
	const repro = request.body.repro;
	const progress = request.body.progress;
	const assignee = request.body.assignee;
	const userID = request.body.userID;
	const connect = await db.connect();
	const result = await connect.query("update bugs set summary=$1, detail=$2, repro=$3, progress=$4, assignee=$5, updated=CURRENT_TIMESTAMP, updator=$6 where id=$7", [summary, detail, repro, progress, assignee, userID, bugID]);
	connect.release();
	response.send(result);
});

router.get('/:bug_id/messages', async (request, response) => {
	const bugID = request.params.bug_id;
	const connect = await db.connect();
	const result = await connect.query("select id, bug_id, message, created, creator, updated, updator from bugs_message where bug_id=$1 order by created", [bugID]);
	connect.release();
	response.json(result.rows);
});

router.get('/:bug_id/messages/:message_id', async (request, response) => {
	const messageID = request.params.message_id;
	const connect = await db.connect();
	const result = await connect.query("select id, bug_id, message, created, creator, updated, updator from bugs_message where id=$1 order by created", [messageID]);
	connect.release();
	response.json(result.rows);
});

router.post('/:bug_id/messages', async (request, response) => {
	const bugID = request.params.bug_id;
	const message = request.body.message;
	const userID = request.body.userID;
	const connect = await db.connect();
	const result = await connect.query("insert into bugs_message (bug_id, message, creator, updator) values ($1, $2, $3, $3)", [bugID, message, userID]);
	connect.release();
	response.send(result);
});

router.put('/:bug_id/messages/:message_id', async (request, response) => {
	const messageID = request.params.message_id;
	const message = request.body.message;
	const userID = request.body.userID;
	const connect = await db.connect();
	const result = await connect.query("update bugs_message set message=$1, updated=CURRENT_TIMESTAMP, updator=$2 where id=$3", [message, userID, messageID]);
	connect.release();
	response.send(result);
});

module.exports = router;