const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
	response.json({});

});

router.get('/:task_id', (request, response) => {
	response.json({});

});

router.post('/', (request, response) => {
	response.json({});

});

router.put('/:task_id', (request, response) => {
	response.json({});

});

router.get('/:task_id/actions', (request, response) => {
	response.json({});

});

router.get('/:task_id/actions/:action_id', (request, response) => {
	response.json({});

});

router.post('/:task_id/actions', (request, response) => {
	response.json({});

});

router.put('/:task_id/actions/:action_id', (request, response) => {
	response.json({});

});

module.exports = router;