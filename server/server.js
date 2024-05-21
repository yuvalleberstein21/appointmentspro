const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDatabase = require('./config/MongoDB');
const authRoutes = require('./Routes/AuthRoutes');

dotenv.config();
connectDatabase();

const app = express();
app.use(bodyParser.json());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        res.status(403).json({ error: 'Not allowed by CORS' });
    } else {
        next(err);
    }
});


// Routes
app.use('/api/auth', authRoutes);



const PORT = process.env.PORT || 1000;
app.listen(PORT, console.log(`server run on port ${PORT} ✅`));