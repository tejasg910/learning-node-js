const exrpess = require('express');

const app = exrpess();
const port  = 9000;
app.get('/', (req, res)=>{
    res.end('Hey Yuor are in get ')
})


app.post('/login', (req, res)=>{
    res.end('Hey Yuor are in post method ')
})


app.listen(port, ()=>{
    console.log('server running successfully')
})