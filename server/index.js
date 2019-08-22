//https://dev.to/loujaybee/using-create-react-app-with-express

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const pino = require('express-pino-logger')();
const paypal_sdk = require('paypal-rest-sdk');
const axios = require('axios');
const cors = require('cors');

paypal_sdk.configure({
  'mode': 'sandbox',
  'client_id': 'AYc_WD_FqZRhsF9vpUmXank8pwsAMS9Xjz3y89LeJ3kXQ_f5jumCjCIKnvYafaGZ0QOHYVs9GeY-M7cF',
  'client_secret': 'EMH6VI34GAwYTfH1ad5wiAU1Wf2_oZBWNYaSuqBy0IMA_tM9Xo8aSbK4mgETbHE1Pg8GLV4PACE5b35m'
})

var config_opts = {
    'mode':'sandbox',
    'client_id': 'AYc_WD_FqZRhsF9vpUmXank8pwsAMS9Xjz3y89LeJ3kXQ_f5jumCjCIKnvYafaGZ0QOHYVs9GeY-M7cF',
    'client_secret': 'EEMH6VI34GAwYTfH1ad5wiAU1Wf2_oZBWNYaSuqBy0IMA_tM9Xo8aSbK4mgETbHE1Pg8GLV4PACE5b35m'
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build')));
app.use(pino);

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
                url: 'https://vpay-backend-auth.herokuapp.com/api/users/balance',
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
    //res.send(200);
    res.end();
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);

// app.listen(8080, () =>
//   console.log('Express server is running on localhost:8080')
// );