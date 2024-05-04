const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.use(express.json());

router.get('/', async (request, response) => {
	const connect = await db.connect();
	const result = await connect.query("select id, summary, detail, deadline, progress, assignee, created, creator, updated, updator from tasks");
	connect.release();
	response.json(result.rows);
});

router.get('/:task_id', async (request, response) => {
	const taskID = request.params.task_id;
	const connect = await db.connect();
	const result = await connect.query("select id, summary, detail, deadline, progress, assignee, created, creator, updated, updator from tasks where id=$1", [taskID]);
	connect.release();
	response.json(result.rows);
});

router.post('/', async (request, response) => {
	const summary = request.body.summary;
	const detail = request.body.detail;
	const deadline = request.body.deadline;
	const userID = request.body.userID;
	const connect = await db.connect();
	const result = await connect.query("insert into tasks (summary, detail, deadline, creator, updator) values ($1, $2, $3, $4, $4)", [summary, detail, deadline, userID]);
	connect.release();
	response.send(result);
});

router.put('/:task_id', async (request, response) => {
	const taskID = request.params.task_id;
	const summary = request.body.summary;
	const detail = request.body.detail;
	const deadline = request.body.deadline;
	const progress = request.body.progress;
	const assignee = request.body.assignee;
	const userID = request.body.userID;
	const connect = await db.connect();
	const result = await connect.query("update tasks set summary=$1, detail=$2, deadline=$3, progress=$4, assignee=$5, updated=CURRENT_TIMESTAMP, updator=$6 where id=$7", [summary, detail, deadline, progress, assignee, userID, taskID]);
	connect.release();
	response.send(result);
});

router.get('/:task_id/messages', async (request, response) => {
	const taskID = request.params.task_id;
	const connect = await db.connect();
	const result = await connect.query("select id, task_id, message, created, creator, updated, updator from tasks_message where task_id=$1 order by created", [taskID]);
	connect.release();
	response.json(result.rows);
});

router.get('/:task_id/messages/:message_id', async (request, response) => {
	const messageID = request.params.message_id;
	const connect = await db.connect();
	const result = await connect.query("select id, task_id, message, created, creator, updated, updator from tasks_message where id=$1 order by created", [messageID]);
	connect.release();
	response.json(result.rows);
});

router.post('/:task_id/messages', async (request, response) => {
	const taskID = request.params.task_id;
	const message = request.body.message;
	const userID = request.body.userID;
	const connect = await db.connect();
	const result = await connect.query("insert into tasks_message (task_id, message, creator, updator) values ($1, $2, $3, $3)", [taskID, message, userID]);
	connect.release();
	response.send(result);
});

router.put('/:task_id/messages/:message_id', async (request, response) => {
	const messageID = request.params.message_id;
	const message = request.body.message;
	const userID = request.body.userID;
	const connect = await db.connect();
	const result = await connect.query("update tasks_message set message=$1, updated=CURRENT_TIMESTAMP, updator=$2 where id=$3", [message, userID, messageID]);
	connect.release();
	response.send(result);
});

module.exports = router;