const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/auth',authRoutes);

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).json({ message: 'something went wrong!'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});