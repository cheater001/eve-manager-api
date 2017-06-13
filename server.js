const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();

const oauthHostname = 'login.eveonline.com';

const jsonParser = bodyParser.json();

const CLIENT_ID = 'afdaef5c2f514ef4b1977ad6c2d02757';
const CLIENT_SECRET = 'D865F2UZXgJxzLMT2xcBUCvBSaWrcf0hvqbXWeMq';

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.post('/login/verify', jsonParser, function (req1, res1) {
  const code = req1.body.code;
  const data = {
    grant_type: 'authorization_code',
    code
  };

  const req = https.request({
    hostname: oauthHostname,
    path: '/oauth/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
    }
  }, function(res) {
    let bodyChunks = [];

    res.on('data', function(chunk) {
      bodyChunks.push(chunk);
    }).on('end', function() {
      res1.send(Buffer.concat(bodyChunks));
    })
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.write(JSON.stringify(data));

  req.end();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});