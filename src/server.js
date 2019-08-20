//https://dev.to/loujaybee/using-create-react-app-with-express

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

const paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox',
  'client_id': 'AYc_WD_FqZRhsF9vpUmXank8pwsAMS9Xjz3y89LeJ3kXQ_f5jumCjCIKnvYafaGZ0QOHYVs9GeY-M7cF',
  'client_secret': 'EMH6VI34GAwYTfH1ad5wiAU1Wf2_oZBWNYaSuqBy0IMA_tM9Xo8aSbK4mgETbHE1Pg8GLV4PACE5b35m'
})

app.use(express.static(path.join(__dirname, 'build')));

app.post('/pay', function (req, res) {
    console.log("testing")
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0; i < payment.links.length;i++){
                if(payment.links[i].rel === 'approval_url'){
                    res.redirect(payment.links[i].href)
                }
            }
        }
    });
 
});

app.get('/success', (req,res) => {
    console.log("NICE!")
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "1.00"
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment){
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.send('Success');
        }
    })
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);