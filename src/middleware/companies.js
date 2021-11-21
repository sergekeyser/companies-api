const { query } = require('express-validator')
const { validationResult } = require('express-validator');
const genericValidation = require('../helpers/generic.validationrules')
const companiesValidation = require('../helpers/companies.validationRules')

exports.validate = (method) => {
        switch (method) {
                case ('get'): {
                  return [
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


