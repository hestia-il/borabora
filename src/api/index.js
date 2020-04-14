const express = require('express');
const userRoutes = require('./routes/user');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cookieParser());
// adding Helmet to enhance your API's security
// app.use(cors());
app.use(helmet());
// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/user', userRoutes);

app.all('*', (req, res, next) => {
    res.status(404);
    res.send('not found');
});

app.use((err, req, res, next) => {
    if (err.error) {
        const {message, code, statusCode} = err.error;
        res.status(statusCode).json({
            message,
            code
        });
    } else {
        console.error(err);
        res.status(500).json({
            error: 'something went wrong'
        });
    }
});

module.exports = app;