const express = require("express");
const app = express();
const mysql = require("mysql");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");

const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
app.set('views', path.join(__dirname, '/public/views'));

app.use(session({secret: "ssshhhhh"}));
app.use(express.static('public'));

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "masterkey",
    database: "testes_usuarios",
});

app.get('/', (req, res) => {
    var message = ' ';
    res.render('index', { message: message });
});

app.get('/conta', (req, res) => {
    if(req.session.user){
        let query_Conta = 'SELECT * FROM usuarios WHERE usu_Email LIKE ?';
        db.query(query_Conta, [req.session.user], (err, results) => {
            res.render('conta', {message:results});
        });
    }else{
        res.redirect('/login'); 
    }
});

app.get('/cadastro', (req, res) => {
    var message = ' ';
    req.session.destroy();
    res.render('cadastro', { message: message });
});

app.post('/cadastro', (req, res) => {

    let username = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    db.query('SELECT * FROM usuarios WHERE usu_Email = ?', [email], (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result.length == 0){
            db.query("INSERT INTO usuarios (usu_Nome, usu_Email, usu_Senha) VALUES (?, ?, ?)", [username, email, senha], (err, result) => {
                if(err){
                    res.send(err);
                }
                res.render('index', {message: "Cadastro Efetuado"});
            });
        }else{
            res.render('cadastro', {message: "Usuario já cadastrado"});
        }
    });

});

app.get('/login', (req, res) => {
    var message = ' ';
    res.render('login', { message: message });

});

app.post('/login', (req, res) => {
    
    let email = req.body.email;
    let senha = req.body.senha;

    db.query('SELECT * FROM usuarios WHERE usu_Email = ? and usu_Senha = ?', [email, senha], (err, results) => {
        if (results.length > 0){
            req.session.user = email;
            res.redirect('conta');
        }else{
            res.render('login', {message :'Credenciais Incorretas'});
        }
        
    });

});

app.post('/update', (req, res) => {

    let username = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    let query_Update = ('UPDATE usuarios SET usu_Nome = ?, usu_Senha = ? WHERE usu_Email LIKE ?');

    db.query(query_Update, [username, senha, [req.session.user]], (err, results) => {

        let query_Update2 = ('SELECT * FROM usuarios WHERE usu_Email = ?');
        db.query(query_Update2, [req.session.user], (err, results) => {
            if(err) throw err;
            res.render('conta', {message:results});
            }
            
        );

    });

});

app.post('/delete', (req, res) => {

    let query_Delete = ('DELETE FROM usuarios WHERE usu_Email = ?');

    db.query(query_Delete, [req.session.user], (err, results) => {
        req.session.destroy();
        res.redirect('/');
    });

});

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});