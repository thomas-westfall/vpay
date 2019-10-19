//https://dev.to/loujaybee/using-create-react-app-with-express

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const pino = require('express-pino-logger')();
const paypal_sdk = require('paypal-rest-sdk');
const axios = require('axios');
const cors=require('cors');

//app.use(cors({origin:true,credentials: true}));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};


    //app.use(cors());
    //app.use(allowCrossDomain);
    
    //app.use(express.bodyParser());
    //app.use(express.methodOverride());
    //app.use(app.router);
    //app.use(cors());

    app.use(function(req,res,next){
        res.header("Acess-Control-Allow-Origin", "*");
        res.header("Access-Controll-Allow-Headers", "origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(express.static('client/build'));
    //app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));


paypal_sdk.configure({
  'mode': 'sandbox',
  'client_id': 'AYc_WD_FqZRhsF9vpUmXank8pwsAMS9Xjz3y89LeJ3kXQ_f5jumCjCIKnvYafaGZ0QOHYVs9GeY-M7cF',
  'client_secret': 'EEMH6VI34GAwYTfH1ad5wiAU1Wf2_oZBWNYaSuqBy0IMA_tM9Xo8aSbK4mgETbHE1Pg8GLV4PACE5b35m'
})

var config_opts = {
    'mode':'sandbox',
    'client_id': 'AYc_WD_FqZRhsF9vpUmXank8pwsAMS9Xjz3y89LeJ3kXQ_f5jumCjCIKnvYafaGZ0QOHYVs9GeY-M7cF',
    'client_secret': 'EEMH6VI34GAwYTfH1ad5wiAU1Wf2_oZBWNYaSuqBy0IMA_tM9Xo8aSbK4mgETbHE1Pg8GLV4PACE5b35m'
};

app.post('/pay/:amount/:email/:username', function (req, res) {
    console.log(req.params)
    var create_payment_json = {
        "sender_batch_header": {
            "email_subject": "Vpay Payment",
            "recipient_type": "EMAIL"
        },
        "items": [
            {
                "recipient_type": "EMAIL",
                "amount": {
                    "value": req.params.amount,
                    "currency": "USD"
                },
                "note": "Thank you for using Vpay!",
                "sender_item_id": "123",
                "receiver": req.params.email
            }
        ]
    };

    paypal_sdk.payout.create(create_payment_json,config_opts, function (err, data) {
        if (err) console.log(err);
        else{
            axios({
                method: 'put',
                url: 'https://cors-anywhere.herokuapp.com/https://vpay-backend-auth.herokuapp.com/api/users/balance',
                data: {
                  username: req.params.username,
                  balance: 0
                }
              });
        }
        console.log("Create Payment Response");
        console.log(data);
    });
    //res.sendFile(path.join(__dirname, '../build/', 'index.html'));
    res.send("Cash out successful!");
    //res.end();
});

app.get('/a', function (req, res) {
  //res.sendFile(path.join(__dirname, '', 'indedx.html'));
  res.send(200)
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });

app.listen(process.env.PORT || 8080);

