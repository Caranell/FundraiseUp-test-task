const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const { connectToDB } = require('./database');
const trackRouter = require('./routes/track');

const STATIC_PORT = 8000;
const REQUESTS_PORT = 8001;

const app = express();
const staticHTMLApp = express();

// APP SERVING STATIC PAGE RUNNING ON PORT 8000
const frontendFolder = path.join(__dirname, 'frontend');
staticHTMLApp.use(express.static(frontendFolder));
staticHTMLApp.get(['/', '/1.html', '/2.html'], (_, res) => {
  res.sendFile(path.join(frontendFolder, 'index.html'));
});

staticHTMLApp.listen(STATIC_PORT);

// APP RUNNING ON PORT 8001
app.use(express.json());
connectToDB();

app.use(cors({
  origin: 'http://localhost:8000',
}));

app.get('/', (_, res) => {
  res.sendFile(path.join(frontendFolder, 'tracker.js'));
});
app.use('/track', trackRouter);

app.listen(REQUESTS_PORT);
