const { body } = require('express-validator')
const { validationResult } = require('express-validator');
//very long regex but matches time stamps like 2012-12-12T23:59:59Z
const timeRFC933UTCRegex = /^([0-9]+)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])[Tt]([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?([Zz])$/
const dateRegex = /^([0-9]+)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/
const yearMonthRegex = /^([0-9]){4}\-(([0][1-9])|([1][0-2]))$/

exports.validate = (method) => {
        console.log('testing!')
	switch (method) {
		case ('post'): {
		  return [
                         body('companyId', 'Required field, currently missing from the request please add')
			    .exists(),
			 body('lastReported', 'Should be a valid RFC 933 formatted field in UTC time zone (no other time zones supported) like so: 2012-12-31T23:59:59Z')
			    .optional()
			    .isString()
			    //long regex but this is just matching an RFC 933 date format
			    .matches(timeRFC933UTCRegex), 
			  body('estimatedTimeInDay', 'Should be one of: preMarketOpen, postMarketClose, morning, midDay, afternoon, noEstimate')
			  .optional()
			  .isIn([["preMarketOpen","postMarketClose","morning","midDay","afternoon","noEstimate"]]),
			  body('nextReporting', 'Should be one of: date-time in UTC (like: 2021-12-31T23:59:59Z) or date (like 2021-12-31 or year month (like 2021-12) or the word \'never\' in case there will be no next reporting')
			    .optional()
			    .custom( value => {
                                 switch(true){
				    case timeRFC933UTCRegex.test(value):
                                    case dateRegex.test(value):
				    case yearMonthRegex.test(value):
				    case 'never':		 
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

