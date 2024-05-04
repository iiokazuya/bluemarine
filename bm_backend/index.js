const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use('/users', require('./users.js'));
app.use('/bugs', require('./bugs.js'));
app.use('/requests', require('./requests.js'));
app.use('/tasks', require('./tasks.js'));

app.get('/', (request, response) => {
	response.send("hello bluemarine.");
});

app.listen(PORT, () => {
	console.log(`localhost:${PORT} started.`);
});