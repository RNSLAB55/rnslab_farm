const express = require('express');
const path = require('path');
const post = 3003;
const app = express();
const mysql = require("mysql");
const request = require('request');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended : false}));

let connection = mysql.createConnection({
    host: "localhost",
    user : "root",
    password : "1234",
    database : "fam",
});

connection.connect();

const setOptions = (url) => {
    const options ={ 
        uri : url,
        headers : {
            Token: "203c700cf48e8185060bf4401445e70a2d50598c54fdce4b078eb5d3af580e0a",
        },
        "rejectUnauthorized" : false,
    }
    return options;
}

const storageSetOptions = (nodeId, url, range) => {
    const options = {
        uri : url,
        headers: {
            Token:
              "203c700cf48e8185060bf4401445e70a2d50598c54fdce4b078eb5d3af580e0a",
        },
        params: {
            nid: `${nodeId}`,
            from: range[0].toString(),
            to: range[1].toString()
        },
        "rejectUnauthorized": false,
    }
    return options;
}

app.get('/', (req, res) => {
    res.send('hi');
});

app.post('/getusers', (req, res) => {
    connection.query("SELECT * FROM setting",
    function(err, rows, fields) {
        if(err){
            console.log(err);
        }else {
            res.send(rows);
        }
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
    })
});

app.post('/getStorage', (req, res) => {
    const nodeId = req.body.nodeId;
    const range = req.body.range;
    const url = req.body.url;
    console.log(nodeId, range, url);
    request(storageSetOptions(nodeId, url, range), function(err, rows) {
        if(err){
            console.log(err);
        }else {
            console.log(rows.body);
            jsonData = JSON.parse(JSON.stringify(rows.body, null, 2));
            res.send(jsonData);
        }
    });
    res.setHeader('Connection', 'close');
});

app.post('/updateNodeType', (req, res) => {
    const nodeType = req.body.nodeType;
    const userId = req.body.userId;
    const nodeId = req.body.nodeId;
    connection.query('UPDATE nodes SET node_Type=? where node_Id=? AND id=?',[nodeType, nodeId, userId], 
    function(err, rows) {
        if(err) {
            console.log(err);
        }else {
            res.send(rows);
            console.log(rows);
        }
    })
});

app.post('/getUserNodes', (req, res) => {
    const id = req.body.id;
    connection.query("SELECT * FROM nodes WHERE id = ?", [id], 
    function(err, rows) {
        if(err) {
            console.log(err);
        }else {
            res.send(rows);
        }
    })
})

app.post('/addNode', (req, res) => {
    const id = req.body.id;
    const nodeId = req.body.nodeId;
    connection.query("INSERT INTO nodes (node_Id, id,MAXT,MAXH,MAXCO,MAXMETHAN,MAXH2S,MAXNOX,MAXCO2,MAXEC,MAXEH,MAXSH,MAXST,MAXAQS,MAXCH4,MINT,MINH,MINCO,MINMETHAN,MINH2S,MINNOX,MINCO2,MINEC,MINEH,MINSH,MINST,MINAQS,MINCH4) SELECT ?,?,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 FROM dual where not exists (SELECT node_Id, id from nodes WHERE node_Id =? and id =?);",[nodeId,id,nodeId,id],
    function(err, rows) {
        if(err) {
            console.log(err);
        }else {
            res.send(rows);
        }
    });
});

app.post('/updateSetting', (req, res) => {
    const uppercase = req.body.uppercase;
    const value = req.body.value;
    const nodeId = req.body.nodeId;
    const userId = req.body.userId;
    connection.query(`UPDATE nodes SET ${uppercase}=? WHERE node_Id=? and id=?;`,[value, nodeId, userId],
    function(err,rows) {
        if(err){
            console.log(err);
        }else {
            res.send(rows);
        }
    })
})


app.listen(post, () => {
    console.log(`Connect at http://localhost:${post}`);
});