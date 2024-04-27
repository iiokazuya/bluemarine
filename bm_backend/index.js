const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (request, response) => {
	response.send("hello bluemarine.");
});

app.listen(PORT, () => {
	console.log(`localhost:${PORT} started.`);
});