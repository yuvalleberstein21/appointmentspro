const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const connectDatabase = require('./config/MongoDB');
const authRoutes = require('./Routes/AuthRoutes');

dotenv.config();
connectDatabase();

const app = express();
app.use(bodyParser.json());


// Routes
app.use('/api/auth', authRoutes);



const PORT = process.env.PORT || 1000;
app.listen(PORT, console.log(`server run on port ${PORT} ✅`));