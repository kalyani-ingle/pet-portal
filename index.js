require("./db/connection");
require('dotenv').config()
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path= require("path");
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");

app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use('/api', apiRoutes);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'Client', 'dist')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Client', 'dist', 'index.html'));
});


// start the server
app.listen(process.env.PORT, (req, res) => {
  console.log(`Server started at port http://localhost:${process.env.PORT}`);
});

module.exports = app;