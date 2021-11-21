const { body, param, query } = require('express-validator')
const { validationResult } = require('express-validator');
const genericValidation = require('../helpers/generic.validationrules')
const companiesValidation = require('../helpers/companies.validationRules')
	
exports.validate = (method) => {
 	switch (method) {
		case ('post'): {
		  return [
		      param('companyId', 'Max length is 15, currently too long').isLength(companiesValidation.staticValidation.companyId.length),
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
	if (!errors.isEmpty()) {
	res.status(400).json({ errors: errors.array() });
        return;
      }
	res.status(200).json({ message: "success"});
	 } catch (err) {
		 return next(err)
	 }
}

