const express = require ('express');
const bodyParser = require ('body-parser');
const session = require ('express-session');
const authRoutes = require ('./routes/auth');
const path = require ('path');

const app = express () ;

app.set ('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use (bodyParser.json ()) ;
app.use (bodyParser.urlencoded ({ extended: true }));
app.use (session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use( (req, res, next) => {
    if (!req.session.user && req.path !== '/auth/login' && req.path !== '/auth/register') {
        return res.redirect ('/auth/login');
    } else if (req.session.user && req.path === '/') {
        return res.redirect ('/auth/profile');
    }
    next ();
    });

    app.use ('/auth', authRoutes);

    app.get ('/', (req, res) => {
        if (req.session.user) {
            return res.redirect ('/auth/profile');
        } else { 
            return res.redirect ('/auth/login');
        }
    });

connection.connect((err) => {
    if(err) {
        console.error("Terjadi kesalahan dalam kondeksi ke MySQL:", err.stack);
        return;
    }
    console.log("Koneksi MySQL berhasil dengan id" + connection.threadId)
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
   const query = 'SELECT * FROM samudera'; 
   connection.query(query, (err, results) => {
        res.render('index', {samudera:results});
   });
});

app.post('/add', (req, res) => {
    const {data_nelayan, hasil_tangkapan_ikan, stok_ikan_dipasar} = req.body;
    const query = 'INSERT INTO samudera (data_nelayan, hasil_tangkapan_ikan, stok_ikan_dipasar) VALUES (?,?,?)';
    connection.query(query, [data_nelayan, hasil_tangkapan_ikan, stok_ikan_dipasar], (err, result) => {
        if (err) {
            console.error("Terjadi kesalahan saat menambahkan data:", err);
            return res.status(500).send("Gagal menambahkan data");
        }
        res.redirect('/');
    });
});


app.get('/edit/:id', (req, res) => {
    const query = 'SELECT * FROM samudera WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        res.render('edit', {samudera:result[0]});
    });
})

app.post('/update/:id', (req, res) =>{
    const {name, lokasi, harga, phone} = req.body;
    const query = 'UPDATE samudera SET data_nelayan = ?, hasil_tangkapan_ikan = ?, stok_ikan_dipasar = ? WHERE id = ?';
    connection.query(query,[data_nelayan, hasil_tangkapan_ikan, stok_ikan_dipasar, req.params.id], (err, result) =>{
        if (err) throw err;
        res.redirect('/');
    });
})

app.get('/delete/:id', (req, res) => {
    const query = 'DELETE FROM samudera WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
})

app.listen (3003, () => {
    console.log ('Server running on port 3003, open web via http://localhost:3003');
});