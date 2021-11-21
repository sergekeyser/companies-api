const { body, param, query } = require('express-validator')
const { validationResult } = require('express-validator');
const genericValidation = require('../helpers/generic.validationrules')
const companiesValidation = require('../helpers/companies.validationRules')
const mongo = require('../helpers/mongodb.driver')
	
exports.validate = (method) => {
 	switch (method) {
		case ('post'): {
		  return [
		      param('companyId', companiesValidation.staticValidation.companyId.error).isLength(companiesValidation.staticValidation.companyId.length),
              body('companyId', 'companyId should not be present in body, instead please only specify in uri parameters')
				.not()
				.exists(), 
			  body('lastReported', genericValidation.staticValidation.timeRFC933UTC.error)
			    .optional()
			    .isString()
			    .matches(genericValidation.staticValidation.timeRFC933UTC.regex), 
			  body('estimatedTimeInDay', companiesValidation.staticValidation.estimatedTimeInDay.error)
			    .optional()
			    .isIn(companiesValidation.staticValidation.estimatedTimeInDay.options),
			  body('nextReporting', companiesValidation.staticValidation.nextReporting.error)
			    .optional()
			    .custom(companiesValidation.nextReporting)
		  ]
		}
	}
}

exports.createDate = async (req,res,next) => {
    try{
	
	const errors = validationResult(req);
	const query = {companyId: req.params.companyId} 
	const update = {$set: 
							{	
								companyId: req.params.companyId, 
								lastReported: req.body.lastReported,
								nextReporting: req.body.nextReporting, 
								estimatedTimeInDay: req.body.estimatedTimeInDay
							}
					}
	
	const options = {upsert: true}
	
	if (!errors.isEmpty()) {
	res.status(400).json({ errors: errors.array() });
        return;
      }
		
	mongo.getDb().collection('companies').updateOne(query,update,options)
    .then(result => {
      console.log(result)
	  res.status(200).json({ message: "success"});
    })  
		
	 } catch (err) {
		 return next(err)
	 }
}
