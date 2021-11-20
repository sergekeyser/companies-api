const express = require('express');
const router = express.Router();
const companiesController = require('../middleware/companiesByCompanyIdReportingDate')
const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()


router.get('/', function (req, res) {
  res.send('Get companies')
} );

router.post('/:companyId/reportingDate',
	      jsonParser,
              companiesController.validate('post'),
	      companiesController.createDate
            );
module.exports = router
