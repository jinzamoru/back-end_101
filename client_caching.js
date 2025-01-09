const express = require('express');
const app = express();

app.use(express.static('public', {
    setHeaders: (res) =>{
    res.set('Cache-Control',
    'public,max-age=3600');
    }
}));

app.listen(3000, () =>
    console.log("Sever running on http://localhost:3000"));