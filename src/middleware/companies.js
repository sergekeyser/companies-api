const { query } = require('express-validator')
const { validationResult } = require('express-validator');
const genericValidation = require('../helpers/generic.validationrules')
const companiesValidation = require('../helpers/companies.validationRules')
const mongo = require('../helpers/mongodb.driver')

exports.validate = (method) => {
        switch (method) {
                case ('get'): {
                  return [
				            query('companyId', companiesValidation.staticValidation.companyId.error)
							    .optional()
								.isString()
								.isLength(companiesValidation.staticValidation.companyId.length),
							query('lastReportedFrom', genericValidation.staticValidation.timeRFC933UTC.error)
								.optional()
								.isString()
								.matches(genericValidation.staticValidation.timeRFC933UTC.regex),
							query('lastReportedTo', genericValidation.staticValidation.timeRFC933UTC.error)
								.optional()
								.isString()
								.matches(genericValidation.staticValidation.timeRFC933UTC.regex),
							query('nextReportingFrom', companiesValidation.staticValidation.nextReporting.error)
							    .optional()
								.isString()
								.custom(companiesValidation.nextReporting),
							query('nextReportingTo', companiesValidation.staticValidation.nextReporting.error)
							    .optional()
								.isString()
								.custom(companiesValidation.nextReporting),
							query('estimatedTimeInDay',companiesValidation.staticValidation.estimatedTimeInDay.error)
			                    .optional()
			                    .isIn(companiesValidation.staticValidation.estimatedTimeInDay.options),
							query('includeNotReported', "Field can only be boolean, please use either true/false")
							    .optional()
								.isBoolean(),
							query('page', genericValidation.staticValidation.page.error)
								.optional()
								.isInt(),
							query('resultsPerPage', genericValidation.staticValidation.resultsPerPage.error + "1000")
								.optional()
								.isInt()	
						]
                }
        }
}

exports.retrieveDate = async (req,res,next) => {
  var query = {}
  var completeData = {}
  
  try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
		{
             res.status(400).json({ errors: errors.array() });
             return;
        }
   query = {companyId: req.query.companyId} 
 	  
   completeData = fillData(req.query);
   offset = completeData.page * completeData.resultsPerPage
   limit = completeData.resultsPerPage
   
   query = setQuery(completeData);
   
   console.log(completeData)
   console.log(query)
	  
   mongo.getDb().collection('companies')
	  .find(query)
	  .sort('companyId')
	  .skip(offset)
	  .limit(limit)
	  .toArray(function(err, result) {
		 if (err) res.status(500).json({ });
         if(result.length == 0) res.status(204).json({})
		 if((result.length != 0) && !err) res.status(200).json(constructResponse(err,result,completeData));
		 }); 
  } catch (err) {
      return next(err)
  }
}

function constructResponse(err,result,completeData)
	{
		const serverurl = process.env.mongo_dbCompanies_baseURL
		var hasMore = false
		
		
		var remappedMessage = result.map( item => {
							const container = {}
							container.companyId = item.companyId,
							container.lastReported = item.lastReported,
							container.nextReporting = item.nextReporting,
							container.estimatedTimeInDay = item.estimatedTimeInDay
							return container
						});
		
		if (completeData.resultsPerPage == remappedMessage.length) hasMore = true 
				
		var paging = {
			    //ToDo update the serverurl to include the correct query parameters
			    previousPageLink: serverurl ,
				nextPageLink: serverurl ,
				numberOfResults: remappedMessage.length ,
				hasMore: hasMore ,
				currentPage: completeData.page
		}

		var returnMessage = { data: remappedMessage, paging: paging}
	    return returnMessage;
	}

//this function takes the incoming query data and fills out the blanks where necessary
function fillData(data) {
	   var companyId				= ""
	   var lastReportedFrom 		= "1900-01-01T00:00:00Z"
	   var lastReportedTo 			= "2999-01-01T00:00:00Z" 
	   var nextReportingFrom 		= "1900-01-01T00:00:00Z"
	   var nextReportingTo 			= "2999-01-01T00:00:00Z"
	   var estimatedTimeInDay 		= ""
	   var includeNotReported 		= false
	   var page						= 0
	   var resultsPerPage			= 10
	   var result					= {}
	   
	   if (data.companyId != null)
	       companyId = data.companyId
	   if (data.lastReportedFrom != null)
			lastReportedFrom = data.lastReportedFrom
	   if (data.lastReportedTo != null)
	        lastReportedTo = data.lastReportedTo
	   if (data.nextReportingFrom != null)
			nextReportingFrom = companiesValidation.nextReportingToDate(data.nextReportingFrom,true)
	   if (data.nextReportingTo != null)
	        nextReportingTo = companiesValidation.nextReportingToDate(data.nextReportingTo,false)
	   if (data.estimatedTimeInDay != null)
            estimatedTimeInDay = data.estimatedTimeInDay
       if (data.page != null)
            page = data.page
       if (data.resultsPerPage != null)
            resultsPerPage = parseInt(data.resultsPerPage,10)
			
	   result = {
		   companyId: companyId,
		   lastReportedFrom: lastReportedFrom,
		   lastReportedTo: lastReportedTo,
		   nextReportingFrom: nextReportingFrom,
		   nextReportingTo: nextReportingTo,
		   estimatedTimeInDay: estimatedTimeInDay,
		   includeNotReported: includeNotReported,
		   page: page,
		   resultsPerPage: resultsPerPage,
	   }
	   return result
   }
   
 function setQuery(filledData)
 {
	var companyId = {}
	var includeNotReported = {notReported: false}
	var dates = {}
	var query = {}
	var estimatedTimeInDay = {}
	
	if(filledData.companyId != "")
	    companyId = {companyId : filledData.companyId}
		
	//This might raise an eyebrow, point is that includeNotReported can be true or false.
    //in case we do NOT want to include he not reported, it is set to false by default, 
	//if we DO want to include it we just set it to empty because we want to return
    //both true and false.
	
	if(filledData.includeNotReported)
		includeNotReported = {}
		
    dates = {
		lastReported: { 
		                $lte: new Date(filledData.lastReportedTo),
						$gte: new Date(filledData.lastReportedFrom)
					},
		nextReportingQueryField: {
									$gte: new Date(filledData.nextReportingFrom),
									$lte: new Date(filledData.nextReportingTo),
								}
	}
	if(filledData.estimatedTimeInDay != "")
     estimatedTimeInDay = {estimatedTimeInDay: filledData.estimatedTimeInDay}
	
    query = Object.assign({},companyId,dates,includeNotReported, estimatedTimeInDay)
    return query	
 } 