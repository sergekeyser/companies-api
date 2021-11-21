const genericValidation = require('./generic.validationRules')

staticValidation = Object.freeze ({
    nextReporting: 
		{ 
            error: 'Should be one of: date-time in UTC (like: 2021-12-31T23:59:59Z) or date (like 2021-12-31 or year month (like 2021-12) or the word \'never\' in case there will be no next reporting' 
		},
	estimatedTimeInDay:
		{
			error: 'Should be one of: preMarketOpen, postMarketClose, morning, midDay, afternoon, noEstimate',
			options: ["preMarketOpen","postMarketClose","morning","midDay","afternoon","noEstimate"]
		}
		
		
})


function nextReporting(value) {
	switch(true){
		case genericValidation.staticValidation.timeRFC933UTC.regex.test(value):
		case genericValidation.staticValidation.date.regex.test(value):
		case genericValidation.staticValidation.yearMonth.regex.test(value):
		case value === 'never':		 
				  return true	     
		default:
				  return false}
}

module.exports = 
{
	staticValidation,
	nextReporting
}