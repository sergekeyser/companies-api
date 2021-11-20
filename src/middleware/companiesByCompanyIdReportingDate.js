const { body } = require('express-validator')
const { validationResult } = require('express-validator');
const genericValidationRules = require('../helpers/generic.validationrules')
	
exports.validate = (method) => {
        console.log('testing!')
	switch (method) {
		case ('post'): {
		  return [
                         body('companyId', 'Required field, currently missing from the request please add')
			    .exists(),
			 body('lastReported', genericValidationRules.timeRFC933UTC.error)
			    .optional()
			    .isString()
			    .matches(genericValidationRules.timeRFC933UTC.regex), 
			  body('estimatedTimeInDay', 'Should be one of: preMarketOpen, postMarketClose, morning, midDay, afternoon, noEstimate')
			  .optional()
			  .isIn([["preMarketOpen","postMarketClose","morning","midDay","afternoon","noEstimate"]]),
			  body('nextReporting', 'Should be one of: date-time in UTC (like: 2021-12-31T23:59:59Z) or date (like 2021-12-31 or year month (like 2021-12) or the word \'never\' in case there will be no next reporting')
			    .optional()
			    .custom( value => {
                                 switch(true){
				    case genericValidationRules.timeRFC933UTC.regex.test(value):
                                    case genericValidationRules.date.regex.test(value):
				    case genericValidationRules.yearMonth.regex.test(value):
				    case value === 'never':		 
				              return true	     
				    default:
				              return false}
			    })
			    
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

