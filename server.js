var express = require('express');
var app = express();
var http = require("http");
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');
var axios = require("axios");
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
var port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log('Đang chạy server port %d', port);
});
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var assert = require('assert');  
const url = 'mongodb://localhost:27017';
// const dbName = 'game';
const dbName = 'bigdata';
var db;
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    db = client.db(dbName);
});
var insertDocuments = function(collection_name,data,callback) {
	try {
		db.collection(collection_name).insertMany([data], function(err, res) {
			assert.equal(err, null);
			callback(res);
		});
	}catch(e){
		console.log(e);
	}
}
var findDocuments = function(collection_name, query, callback) {
    db.collection(collection_name).find(query).toArray(function(err, res) {
		assert.equal(err, null);
		callback(res);
	});
}
var updateDocument = function(collection_name, query,update,callback) {
    const collection = db.collection(collection_name);
    collection.updateMany(query, { $set: update}, function(err, result) {
        assert.equal(err, null);
        callback(result);
	});
}
var updateSert = function(collection_name, query,update,callback) {
    const collection = db.collection(collection_name);
    collection.updateMany(query, { $set: update},{upsert: true}, function(err, result) {
        assert.equal(err, null);
        callback(result);
	});
}
var removeDocument = function(collection_name, query,callback) {
    const collection = db.collection(collection_name);
	collection.deleteMany(query, function(err, result) {
	assert.equal(err, null);
		callback(result);
	});
}
app.get('/', function (req, res) {
    res.render("layout",{title:"Trang chủ",content:"home"});
});
app.get('/scan_live', function (req, res) {
    res.render("layout",{title:"Get phone from live",content:"scan_live"});
});

app.post("/api/add_uid_phone",jsonParser,function(req,res){
    res.status(200).json({ message: 'ok' });
    findDocuments("tb_user",{uid:"100000269087455"},function(callback){
        console.log(callback);
    });
    // data = req.body.data;
    // arr_data = data.split(",");
    // if(arr_data.length > 0){
    //     arr_data.forEach(element => {
    //         arr_id = element.split("|||");
    //         updateSert("tb_user",{uid:arr_id[0]},{phone:arr_id[1],table:arr_id[2]},function(callback){});
    //     });
    // }
});
