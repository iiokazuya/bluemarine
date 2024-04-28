const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
	response.json({});

});

router.get('/:request_id', (request, response) => {
	response.json({});

});

router.post('/', (request, response) => {
	response.json({});

});

router.put('/:request_id', (request, response) => {
	response.json({});

});

router.get('/:request_id/actions', (request, response) => {
	response.json({});

});

router.get('/:request_id/actions/:action_id', (request, response) => {
	response.json({});

});

router.post('/:request_id/actions', (request, response) => {
	response.json({});

});

router.put('/:request_id/actions/:action_id', (request, response) => {
	response.json({});

});

module.exports = router;