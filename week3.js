require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const User = require('./models/user');

const app = express();
app.use(express.json());

sequelize.sync().then(() =>
    console.log('Database synced.')).catch(err =>
    console.error('Error syncing database:', err));

// ดึงข้อมูลผู้ใช้
app.get('/api/users',async (req,res)=>{
    try {
        const users = await User.findAll();
        res.json(users);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

// เพิ่มข้อมูลผู้ใช้ใหม่
app.post('/api/users',async (req,res)=>{
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({error: error.message});
    }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

