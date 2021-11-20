const express = require('express');
const router = express.Router();
const companiesByCompanyIdReportingDate = require('../middleware/companiesByCompanyIdReportingDate')
const companies = require('../middleware/companies')
const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()



router.get('/',
	   companies.validate('get'),
	   companies.createDate
         );
	    
router.post('/:companyId/reportingDate',
	      jsonParser,
              companiesByCompanyIdReportingDate.validate('post'),
	      companiesByCompanyIdReportingDate.createDate
            );
module.exports = router
