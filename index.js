var express = require('express');
var app     = express();
var cors    = require('cors');
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db 	    = low(adapter);

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// Set some defaults
db.defaults({ 
    accounts:[
        {name        : '',
         email       : '',
         balance     : 0,
         password    : '',
         transactions: []}
    ] 
}).write();

var audit = function(action, amount){
    var record = {
        action    : action,
        amount    : amount,
        timestamp : new Date()
    };
    return record;
};

 
app.get('/account/create/:name/:email/:password', function (req, res) {
    var message = '';

    // check if account exists
    var account = db.get('accounts')
      .find({ email: req.params.email })
      .value();

    if (account){
        message = 'Account Already Exists!';   
    }
    else{
        // add account
        db.get('accounts')
          .push({ name         : req.params.name, 
                  email        : req.params.email,
                  balance      : 0,
                  password     : req.params.password, 
                  transactions :[
                    audit('create',0)
                  ]})
          .write();
        message = 'Account Created!';    
    }

    console.log(message);
    res.send(message);

});

app.get('/account/login/:email/:password', function (req, res) {

    var account = db.get('accounts')
      .find({ email: req.params.email })
      .value();

    if (account.password === req.params.password){
      account.transactions.push(audit('login',0));
      res.send(account);
      console.log(account);
    }
    else{
      res.send(null);
      console.log('Login Failed');
    }
    
});

app.get('/account/get/:email', function (req, res) {

    var account = db.get('accounts')
      .find({ email: req.params.email })
      .value();

    account.transactions.push(audit('read',0));

    res.send(account);
    console.log(account);

});

app.get('/account/deposit/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    // get account balance
    var account = db.get('accounts')
      .find({ email: req.params.email })
      .value();

    account.balance = account.balance + amount;
    account.transactions.push(audit('deposit',amount));

    var message = 'Deposit Complete!';
    console.log(message);
    res.send(message);    
});

app.get('/account/withdraw/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    // get account balance
    var account = db.get('accounts')
      .find({ email: req.params.email })
      .value();

    account.balance = account.balance - amount;
    account.transactions.push(audit('withdraw',amount));

    var message = 'Withdrawal Complete!';
    console.log(message);
    res.send(message); 
      
});

app.get('/account/transactions/:email', function (req, res) {

    var account = db.get('accounts')
      .find({ email: req.params.email })
      .value();

    account.transactions.push(audit('transactions',0));

    console.log(account.transactions);
    res.send(account.transactions); 
});

app.get('/account/all', function (req, res) {

    var all = db.get('accounts').value();
    console.log(all);
    res.send(all);
});



var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);

