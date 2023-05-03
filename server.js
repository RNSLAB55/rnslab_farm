const express = require('express');
const path = require('path');
const post = 3003;
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const getConnection = require("./db");

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(express.static(path.join(__dirname, 'rnslab_farm/build')));

const setOptions = (url) => {
    const options ={ 
        uri : url,
        headers : {
            Token: process.env.TOKEN,
        },
        "rejectUnauthorized" : false,
    }
    return options;
}

app.get('/', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, '/rnslab_farm/build/index.html'));
});

app.post('/getusers', (req, res) => {
    getConnection((connection) => {
        connection.query("SELECT * FROM setting",
        function(err, rows, fields) {
            if(err){
                console.log(err);
            }else {
                res.send(rows);
            }
        });
        connection.release();
    })
});

app.post('/getNodes', (req, res) => {
    const url = req.body.url;
    request(setOptions(url), function(err, rows) {
        if(err) {
            console.log(err);
        }else {
            jsonData = JSON.parse(JSON.stringify(rows.body, null, 2));
            res.send(jsonData);
        }
    });
});

app.post('/getNode', (req, res) => {
    const url = req.body.url;
    console.log(url);
    request(setOptions(url), function(err, rows) {
        if(err) {
            console.log(err);
        }else {
            jsonData = JSON.parse(JSON.stringify(rows.body, null));
            res.send(jsonData);
        }
    });
});

app.post('/getStorage', (req, res) => {
    const url = req.body.url;
    request(setOptions(url), function(err, rows) {
        if(err) {
            console.log(err);
        }else {
            jsonData = JSON.parse(JSON.stringify(rows.body, null));
            res.send(jsonData);
        }
    });
});

app.post('/updateNodeType', (req, res) => {
    const nodeType = req.body.nodeType;
    const userId = req.body.userId;
    const nodeId = req.body.nodeId;
    getConnection((connection) => {
        connection.query('UPDATE nodes SET node_Type=? where node_Id=? AND id=?',[nodeType, nodeId, userId], 
        function(err, rows) {
            if(err) {
                console.log(err);
            }else {
                res.send(rows);
                console.log(rows);
            }
        });
    });
});

app.post('/getUserNodes', (req, res) => {
    const id = req.body.id;
    getConnection((connection) => {
        connection.query("SELECT * FROM nodes WHERE id = ?", [id], 
        function(err, rows) {
            if(err) {
                console.log(err);
            }else {
                res.send(rows);
            }
        });
        connection.release();
    });
});

app.post('/addNode', (req, res) => {
    const id = req.body.id;
    const nodeId = req.body.nodeId;
    getConnection((connection) => {
        connection.query("INSERT INTO nodes (node_Id, id,MAXT,MAXH,MAXCO,MAXMETHAN,MAXH2S,MAXNOX,MAXCO2,MAXEC,MAXEH,MAXSH,MAXST,MAXAQS,MAXCH4,MAXPM1,MAXPM10,MINT,MINH,MINCO,MINMETHAN,MINH2S,MINNOX,MINCO2,MINEC,MINEH,MINSH,MINST,MINAQS,MINCH4,MINPM1,MINPM10,MAXPM25,MINPM25) SELECT ?,?,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 FROM dual where not exists (SELECT node_Id, id from nodes WHERE node_Id =? and id =?);",[nodeId,id,nodeId,id],
        function(err, rows) {
            if(err) {
                console.log(err);
            }else {
                res.send(rows);
            }
        });
        connection.release();
    });
});

app.post('/updateSetting', (req, res) => {
    const uppercase = req.body.uppercase;
    const value = req.body.value;
    const nodeId = req.body.nodeId;
    const userId = req.body.userId;
    getConnection((connection) => {
        connection.query(`UPDATE nodes SET ${uppercase}=? WHERE node_Id=? and id=?;`,[value, nodeId, userId],
        function(err,rows) {
            if(err){
                console.log(err);
            }else {
                res.send(rows);
            }
        });
        connection.release();
    });
})


app.listen(post, () => {
    console.log(`Connect at http://localhost:${post}`);
});

app.get('*', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, '/rnslab_farm/build/index.html'));
});