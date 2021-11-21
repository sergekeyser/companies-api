require('dotenv').config({ path: 'dev.env' });
const express = require('express');
const mongo = require('./helpers/mongodb.driver.js')
const app = express();
const companiesRouter = require('./routes/companies.routes');
const path = require('path')

const version = process.env.mongo_dbCompanies_version
const apiPort = process.env.api_port

mongo.connectDb();
app.listen(3000, function() {
  console.log('listening on 3000')
})

app.get(version + '/swagger', (req, res) => {
		console.log('swag')
		res.sendFile(__dirname + '/swaggerdoc.yml')})

app.use( version + '/companies/', companiesRouter )
app.use(express.json())

app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.status(404).send(JSON.stringify({
	  "message": "That endpoint did not exist, for documentation of this api see: https://github.com/sergekeyser/companies-api"
  }))
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
   res.setHeader('Content-Type', 'application/json');
  res.status(500).send(JSON.stringify({
          "message": "Oopsie something went wrong, feel free to raise a bug on https://github.com/sergekeyser/companies-api "
  }))
})

