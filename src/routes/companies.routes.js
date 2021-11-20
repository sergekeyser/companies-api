const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.send('Get companies')
} );

router.post('/:companyId/reportingDate', function (req,res) {
	res.send('post companies ' + req.params.companyId)
});
module.exports = router
