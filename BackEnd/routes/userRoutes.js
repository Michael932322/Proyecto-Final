const express = require('express');
const passport = require('passport');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

// Registro de usuario
router.post('/register', registerUser);

// Inicio de sesión
router.post('/login', loginUser);

module.exports = router;


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/'); // Redirige al usuario a la página principal
    });

module.exports = router;


