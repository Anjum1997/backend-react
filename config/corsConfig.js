

const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:5000','http://localhost:8000'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);
