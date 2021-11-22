const timeRFC933UTCRegex = /^([0-9]+)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])[Tt]([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?([Zz])$/;
const dateRegex = /^([0-9]+)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
const yearMonthRegex = /^([0-9]){4}\-(([0][1-9])|([1][0-2]))$/;

	

staticValidation = Object.freeze ({
    timeRFC933UTC: 
		{ 
			regex: timeRFC933UTCRegex,
            error: "Should be a valid RFC 933 formatted field in UTC time zone (no other time zones supported) like so: 2012-12-31T23:59:59Z" 
		},
	date:
		{ 
			regex: dateRegex,
			error: "Invalid date, should be date like 2012-12-31"
        },
	yearMonth: 
		{
			regex: yearMonthRegex,
			error: "Invalid year month, should be formatted like 2012-12"
        },
	page:
		{
			error: "Should be integer"
		},
	resultsPerPage:
	    {
			error: "Should be integer, and less than: "
		}
})



module.exports = 
{
	staticValidation
}