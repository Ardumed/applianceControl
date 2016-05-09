var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://admin:nON6zS3uWa99wtGS@SG-ardumed-7417.servers.mongodirector.com:27017/iot';



app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

// app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/css', express.static(__dirname + '/www/css'));
app.use('/fonts', express.static(__dirname + '/www/fonts/'));
app.use('/images', express.static(__dirname + '/www/images/'));
app.use('/js', express.static(__dirname + '/www/js/'));
//app.use(express.static(__dirname + '/src/login'));

//app.get('/login', function (req, res) {
//  res.sendFile(path.join(__dirname + '/src/login/login.html'));
//});


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/www/index.html'));
});


app.post('/setprescription', function(req, res) {
    getDetails(req);
    res.sendFile(path.join(__dirname + '/www/simget.html'));
});

app.get('/simulation', function(req, res) {
    res.sendFile(path.join(__dirname + '/www/simget.html'));
});

app.post('/simulation', function(req, res) {
    var reply = {};
    // reply.date = req.body.date;
    // reply.time = req.body.time;
    simulationSave(req);
    res.sendFile(path.join(__dirname + '/www/simget.html'));
});

var getDetails = function(req) {
    var det = {};
    det.name = req.body.patientName;
    det.age = req.body.patientAge;
    det.medNum = req.body.medicineNumber;

    var fromDate = new Date(req.body.fromDate);
    fromDate.setHours(0, 0, 0, 0);
    det.from = fromDate;

    var toDate = new Date(req.body.toDate);
    toDate.setHours(24, 0, 0, 0);
    det.to = toDate;

    det.med0 = req.body.medicineName1;
    det.med0morning = req.body.morningCheckbox1;
    det.med0noon = req.body.noonCheckbox1;
    det.med0night = req.body.nightCheckbox1;
    det.med0syrup = req.body.check1;

    det.med1 = req.body.medicineName2;
    det.med1morning = req.body.morningCheckbox2;
    det.med1noon = req.body.noonCheckbox2;
    det.med1night = req.body.nightCheckbox2;
    det.med1syrup = req.body.check2;

    det.med2 = req.body.medicineName3;
    det.med2morning = req.body.morningCheckbox3;
    det.med2noon = req.body.noonCheckbox3;
    det.med2night = req.body.nightCheckbox3;
    det.med2syrup = req.body.check3;

    var insertDocument = function(db, callback) {
        db.collection('control').insertOne(det, function(err, result) {
            assert.equal(err, null);
            console.log(det);
            console.log("Inserted a document into the iot collection.");
            callback();
        });
    };

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocument(db, function() {
            db.close();
        });
    });

};


var simulationSave = function(req) {
    var det = {};
    var x = new Date(req.body.date + ' ' + req.body.time);
    det.datetime = x;

    var insertDocument = function(db, callback) {
        db.collection('simulation').insertOne(det, function(err, result) {
            assert.equal(err, null);
            console.log(det);
            console.log("Inserted a document into the control collection.");
            callback();
        });
    };

    return MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocument(db, function() {
            db.close();
        });
    });

};

/**
 * - POST : set prescription
 * - GET: mainpage : introduction page
 * - GET: day : prescription for that day
 */


var port = process.env.PORT || 4000;
app.listen(port, function() {
    console.log(__dirname);
    console.log('Example app listening on port ' + port + ' !');
});
