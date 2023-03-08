const express = require('express');
const app = express();
const post = 3003;
const cors = require('cors');
const bodyParser = require("body-parser");
const mysql = require("mysql");

let connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "1234",
    database : "fam",
});;

connection.connect();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send('hi');
});

app.post('/getuser', (req,res) => {
    connection.query("SELECT * FROM setting", 
    function(err, rows, fields) {
        if(err) {
            console.log(err);
        }else {
            console.log(rows[0]);
            res.send(rows);
        }
    })
})


app.post('/getusernodes', (req,res) => {
    connection.query("SELECT * FROM nodes",
    function(err, rows, fields) {
        if(err) {
            console.log(err);
        }else {
            console.log(rows);
            res.send(rows);
        }
    });
})

app.listen(post, () => {
    console.log(`Connect at http://localhost:${post}`);
})