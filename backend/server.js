const express = require('express');
require('dotenv').config({ path: 'backend/.env' });


// Routes
const boardRouter = require('./router/boards');
const teamRouter = require('./router/Teams');
const accountRouter = require('./router/Accounts');
// const incidentRouter = require('./router/incidentRouter');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/boards', boardRouter);
app.use('/teams', teamRouter);
app.use('/accounts', accountRouter);
// app.use('/incidents', incidentRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
