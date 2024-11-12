const express = require ('express') ;
const router = express.Router () ;
const bcrypt = require ('bcryptjs') ;
const db = require ('../config/db') ;

// Render halaman register
router.get ('/register', (req, res) => {
    res.render('register');
}) ;

// Proses register user
router.post ('/register', (req, res) => {
    const { Username, Email, Phone, Instagram, Password}= req.body;

    const hashedPassword = bcrypt.hashSync (Password, 10) ;

    const query = "INSERT INTO users (Username, Email, Phone, Instagram, Password) VALUES (?,?,?,?,?) ";
    db.query (query, [Username, Email, Phone, Instagram, hashedPassword], (err, result) => {
        if (err) throw err;
        res.redirect ('/auth/login');
    }) ;
}) ;

// Render halaman login
router.get ('/login', (req, res) => {
    res.render ('login');
});

// Proses login user
router.post ('/login', (req, res) => {
    const { Username, Password } = req. body;
    const query = "SELECT * FROM users WHERE Username = ?";
    db.query (query, [Username], (err, result) => {
        if (err) throw err; 

        if (result.length > 0) {
        const user = result [0];
    
            if (bcrypt.compareSync (Password, user.Password)) {
                req.session.user = user;
                res.redirect ('/auth/profile');
            } else {
                res.send ('Incorrect password') ;
            }
        } else {
            res.send ('user not found' ) ;
        }
    });
});

// Render halaman profil user
router.get ('/profile', (req, res) => {
    if (req.session.user) {
        res.render ('profile', { user: req.session.user });
    } else {
        res.redirect ('/auth/login');
    }
});

  // Proses logout
router.get ('/logout', (req, res) => {
    req.session.destroy ();
    res.redirect ('/auth/login') ;
});

    module.exports = router;