const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.use(express.json());

router.get('/', async (request, response) => {
	const connect = await db.connect();
	const result = await connect.query("select id, summary, detail, repro, progress, assignee from ticket");
	connect.release();
	response.json(result.rows);
});

router.get('/:bug_id', async (request, response) => {
	const bugID = request.params.bug_id;
	const connect = await db.connect();
	const result = await connect.query("select id, summary, detail, repro, progress, assignee from ticket where id= $1",[bugID]);
	connect.release();
	response.json(result.rows);
});

router.post('/', async (request, response) => {
	const summary = request.body.summary;
	const detail = request.body.detail;
	const repro = request.body.repro;
	const connect = await db.connect();
	const result = await connect.query("insert into ticket(summary, detail, repro) values($1, $2, $3)", [summary, detail, repro]);
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
	const connect = await db.connect();
	const result = await connect.query("update ticket set summary=$1, detail=$2, repro=$3, progress=$4, assignee=$5 where id=$6", [summary, detail, repro, progress, assignee, bugID]);
	connect.release();
	response.send(result);
});

router.get('/:bug_id/actions', (request, response) => {
	response.json({});

});

router.get('/:bug_id/actions/:action_id', (request, response) => {
	response.json({});

});

router.post('/:bug_id/actions', (request, response) => {
	response.json({});

});

router.put('/:bug_id/actions/:action_id', (request, response) => {
	response.json({});

});

module.exports = router;