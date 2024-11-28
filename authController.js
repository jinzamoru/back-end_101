const jwt = require('jsonwebtoken');

exports.login = (req, res) =>{
    const {username , password} = req.body;
    if (username === 'admin' && password === '123456'){
        const token = jwt.sign({username},'123456789',{expiresIn: '1h'});
        res.json({token});
    }else {
        res.status(401).json({ message: 'Invalid credentials'});
    }
};
