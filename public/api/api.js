
function create() {
    var name     = document.getElementById('name').value;
    var email    = document.getElementById('email').value;
    var password = document.getElementById('password').value;  
    var status   = document.getElementById('createStatus');   
    var url = '/account/create/' + name + '/' + email + '/' + password;

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log(err);
            } else {
                console.log(res.text);
                status.innerHTML = res.text;
            }
        });
}

function login() {
    var email    = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;
    var status   = document.getElementById('loginStatus');    
    var url = '/account/login/' + email + '/' + password;

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log(err);
            } else {
                if (res.body){
                    console.log(res.body);
                    status.innerHTML = 'Login Successful!';
                    setTimeout(function(){ status.innerHTML = '';},3000);
                }
                else{
                    console.log('Authentication Failed');
                }
            }
        });
}

function deposit() {
    var email   = document.getElementById('depositEmail').value;    
    var amount  = document.getElementById('depositAmount').value;
    var status  = document.getElementById('depositStatus');    
    var url = '/account/deposit/' + email + '/' + amount;

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log(err);
            } else {
                if (res.text){
                    console.log(res.text);
                    status.innerHTML = res.text;
                }
                else{                    
                    console.log('Deposit Failed');
                    status.innerHTML = 'Deposit Failed';
                }
                setTimeout(function(){ status.innerHTML = '';},3000);
            }
        });
}

function withdraw() {
    var email   = document.getElementById('withdrawEmail').value;    
    var amount  = document.getElementById('withdrawAmount').value;
    var status  = document.getElementById('withdrawStatus');    
    var url = '/account/withdraw/' + email + '/' + amount;

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log(err);
            } else {
                if (res.text){
                    console.log(res.text);
                    status.innerHTML = res.text;
                }
                else{
                    console.log('Withdrawal Failed');
                    status.innerHTML = 'Withdrawal Failed';
                }
                setTimeout(function(){ status.innerHTML = '';},3000);
            }
        });
}

function transactions() {
    var email   = document.getElementById('transactionsEmail').value;    
    var status  = document.getElementById('transactionsStatus');    
    var url = '/account/transactions/' + email;

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log(err);
            } else {
                if (res.body){
                    console.log(res.body);
                    status.innerHTML = JSON.stringify(res.body);
                }
                else{
                    console.log('Transactions Request Failed');
                    status.innerHTML = 'Transactions Request Failed';
                }
                setTimeout(function(){ status.innerHTML = '';},3000);
            }
        });
}

function balance() {
    var email   = document.getElementById('balanceEmail').value;    
    var status  = document.getElementById('balanceStatus');    
    var url = '/account/get/' + email;

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log(err);
            } else {
                if (res.body){
                    console.log(res.body);
                    status.innerHTML = JSON.stringify(res.body.balance);
                }
                else{
                    console.log('Balance Request Failed');
                    status.innerHTML = 'Balance Request Failed';
                }
                setTimeout(function(){ status.innerHTML = '';},3000);
            }
        });
}

function allData() {
    var status  = document.getElementById('allDataStatus');    
    var url = '/account/all';

    superagent
        .get(url)
        .end(function(err, res){
            if (err) {
                console.log(err);
            } else {
                if (res.body){
                    console.log(res.body);
                    status.innerHTML = JSON.stringify(res.body);
                }
                else{
                    console.log('All Data Request Failed');
                    status.innerHTML = 'All Data Request Failed';
                }
            }
        });
}

