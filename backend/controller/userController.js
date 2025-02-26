// const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const db = require('../config/connected');
const User = db.user;



var register =  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        req.session.userId = newUser.id;
        res.status(201).send('User created successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};


var loginUser = async (req, res) => {
    console.log('Request Body:', req.body);
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).send('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        req.session.userId = user.id;
        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).send("Server Error");
            }
            res.status(200).send("Login successful");
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
}

var logoutUser =  (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Logout failed');
        res.clearCookie('connect.sid');
        res.status(200).send('Logout successful');
    });
};

var getUserProfile =  async (req, res) => {
    try {
        const user = await User.findByPk(req.session.userId, { attributes: ['id', 'username', 'email'] });
        if (!user) return res.status(404).send('User not found');
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
}

module.exports={
    register,
    loginUser,
    logoutUser,
    getUserProfile,
 };
