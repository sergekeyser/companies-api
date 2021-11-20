const express = require('express');
const app = express();
var companiesRouter = require('./routes/companies.routes');

app.listen(3000, function() {
  console.log('listening on 3000')
})

app.use('/companies/', companiesRouter )

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
