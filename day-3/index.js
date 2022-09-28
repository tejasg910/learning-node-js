const http = require('http')

// console.log(http)

const port  = 9000;
const host = "localhost";


const onRequest = (req, res)=>{console.log("Got Incoming request")
console.log(req.method)
if(req.method=='post'){
    res.end('this is from post method')
}
if(req.method==='get')
{

    res.end('this is response from the get request ')
}
}
const server  = http.createServer(onRequest);


function onListening(){
    console.log('server is listening on the port ', port)

}

server.listen(port, onListening)

