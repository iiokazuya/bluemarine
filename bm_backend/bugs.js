const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.use(express.json());

router.get('/', async (request, response) => {
	response.json({});
});

router.get('/:bug_id', (request, response) => {
	response.json({});

});

router.post('/', (request, response) => {
	response.json({});

});

router.put('/:bug_id', (request, response) => {
	response.json({});

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