var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


const cors = require('cors');
app.use(cors());

var mysql = require('mysql');
var pool =  mysql.createPool({
host : '34.66.129.47',
user : 'it217113',
port : 8081,
password: 'it217113',
database: 'test',
queueLimit : 0, // unlimited queueing
connectionLimit : 0 // unlimited connections 
});


app.get('/', function(req, res){
	res.send("Hello There!")
});

app.get('/a', function(req, res){
	pool.getConnection(function(err, connection){    
  	//run the query
  	connection.query('select * from contacts',  function(err, rows){
    if(err) throw err;
    else {
        console.log(rows);
    }
  });
});

app.get('/books/:keyword', function(req, res){
	console.log(req.params.keyword);
	res.send(req.params.keyword)
});

app.post('/books/', function(req, res){
	res.send(req.body);
});


var server = app.listen(8081, function(){

	var host = server.address().address;
	var port = server.address().port;
	console.log(`Example app listening at http://${host}:${port}`);

});


