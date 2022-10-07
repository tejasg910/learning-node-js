const jwt = require('jsonwebtoken');


// The default algorithm is hs256
// we are generating the signature using secret key and data algorithm is optional the default is hs256 
const sign  = jwt.sign({role: "admin"}, "tejasgiri", {algorithm: 'HS256'});

console.log(sign);

// we are jwt.verifing the token using the jwt.verify method and it gives us the data pased in the token it takes to arguments first one is signed token and second is secret key 
const verifing  = jwt.verify(sign, "tejasgiri")
console.log(verifing)