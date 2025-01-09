const express = require('express');
const cache = require('memory-cache');
const redis = require('redis');

const app = express();
const client = redis.createClient();

client.on('error', (err)=>{
    console.error('Redis Error:', err);
});

(async ()=>{
    await client.connect();
    console.log('Connected to Redis!');
});

const cacheMiddleware = (req, res, next) => {
    const cachedData = cache.get(req.originalUrl);
    if (cachedData) {
        return res.json({
            message:"ข้อมูลจาก cahced", 
            cache: cachedData
        });
    }
    next();
};

app.get('/api/data', cacheMiddleware, (req, res) => {
    const data = {
        message: "ข้อมูลจาก API",
        timestamp: new Date(),
    };
    cache.put(req.originalUrl, data, 30 * 1000);
    res.json(data);
});

app.listen(3000, () =>
    console.log("Sever running on http://localhost:3000"));