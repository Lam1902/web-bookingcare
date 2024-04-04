const express = require('express')
const viewEngine =  require('./src/config/viewEngine')
const initWebRoutes = require ('./src/route/web')
const bodyParser = require('body-parser')
require('dotenv').config()
const connectDB = require('./src/config/connectDB')
const cors = require('cors');

let app = express()

app.use(cors({ 
    origin: true ,
    credentials: true
}));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended : true, limit: '50mb'}))

viewEngine(app)
initWebRoutes(app)

let port = process.env.PORT || 8081

app.listen(port, () => {
    console.log('Server is running on : ', port)
})