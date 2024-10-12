const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    
    db.query(sql, [email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error al registrar usuario' });
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    });
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';

    db.query(sql, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: 'Credenciales inválidas' });
        
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        
        if (match) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    });
};
