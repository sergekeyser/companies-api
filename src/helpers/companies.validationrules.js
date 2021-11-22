const genericValidation = require('./generic.validationrules')

staticValidation = Object.freeze ({
    nextReporting: 
		{ 
            error: 'Should be one of: date-time in UTC (like: 2021-12-31T23:59:59Z) or date (like 2021-12-31 or year month (like 2021-12) or the word \'never\' in case there will be no next reporting' 
		},
	estimatedTimeInDay:
		{
			error: 'Should be one of: preMarketOpen, postMarketClose, morning, midDay, afternoon, noEstimate',
			options: ["preMarketOpen","postMarketClose","morning","midDay","afternoon","noEstimate"]
		},
	companyId:
		{
			error: 'Company id should have min length of 1 character and max length of 15',
			length: { min: 1, max:15}
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

//this function allows to convert any of the possible options of next reporting to a full date
//nextRepoting is the date to match
//isFrom is true if the date is a from date such that the lower boundery of the date/month is added.

function nextReportingToDate(nextReporting, isFrom)
{
	switch(true){
		case genericValidation.staticValidation.timeRFC933UTC.regex.test(nextReporting):
			return nextReporting
		case genericValidation.staticValidation.date.regex.test(nextReporting): {
		    if(isFrom)
				return nextReporting + "T00:00:00Z"
		    else   
			    return nextReporting + "T23:59:59Z"
		}
		case genericValidation.staticValidation.yearMonth.regex.test(nextReporting):{
		    if(isFrom)
			   return nextReporting + "-01T00:00:00Z"
			else
		       return nextReporting + "-31T00:00:00Z"
		}
		case nextReporting === 'never':		 
				  return "2999-12-31T00:00:00Z"	     
		default:
				  return "2999-12-31T00:00:00Z"}
}
module.exports = 
{
	staticValidation,
	nextReporting,
	nextReportingToDate
}
