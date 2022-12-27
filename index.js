//server creation
//1 import express


const express = require('express');
//import dataservices
const dataservice = require('./services/data service')
//import cors
const cors = require('cors')



//2 create an application using the express
const app = express()
const jwt=require('jsonwebtoken')

//to parse json from request body

app.use(express.json())
app.use(cors({
    origin:'http://localhost:4200'
}))
//3create a port number
app.listen(3000,() => {
    console.log("listening on port 3000");
})

//resolving get request
// app.get('/', (req, res) => {
//     res.send('Get request')
// })
// //resolving post request
// app.post('/', (req, res) => {
//     res.send('post request')
// })
// //resolving put request
// app.put('/', (req, res) => {
//     res.send('put request')
// })
// //resolving patch request
// app.patch('/', (req, res) => {
//     res.send('patch request')
// })
// //resolving delete request
// app.delete('/', (req, res) => {
//     res.send('delete request')
// })

//api request

//application software middleware
const appMiddleware = (req, res, next) => {
    console.log("application software middleware");
    next();
}
app.use(appMiddleware)
//router specific middleware


const jwtMiddleware = (req, res, next) => {
    try {
        console.log('router specific middleware');
        const token=req.body.token
        // const token = req.headers['x-access-token']
        const data = jwt.verify(token, 'superkey2022')
        console.log(data);
        next();
    }
    catch {
        res.status(422).json({
            statusCode: 422,
            status: false,
            message:"please login first"
        })
    }
}

//registration request
app.post('/signin', (req, res) => {
    console.log(req.body);
    dataservice.signin(req.body.acno, req.body.username, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result);
        })

    // res.send('signin sucessfull')
})




//login request
app.post('/login', (req, res) => {
    console.log(req.body);
    dataservice.login(req.body.acno, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result);
        })
})
//transaction request
app.post('/transaction',jwtMiddleware, (req, res) => {
    console.log(req.body);
    dataservice.gettransaction(req.body.acno)
    .then(result => {
        res.status(result.statusCode).json(result);
    })
    // res.status(result.statusCode).json(result);
})
//deposit request
app.post('/deposit',jwtMiddleware, (req, res) => {
    console.log(req.body);
    dataservice.deposit(req.body.acno, req.body.password, req.body.amount)
    .then(result => {
        res.status(result.statusCode).json(result);
    })
})
    // res.status(result.statusCode).json(result);

//withdraw request
app.post('/withdraw',jwtMiddleware, (req, res) => {
    console.log(req.body);
    dataservice.withdraw(req.body.acno, req.body.password, req.body.amount)
    .then(result => {
        res.status(result.statusCode).json(result);
    })
})
    // res.status(result.statusCode).json(result);

//delete request