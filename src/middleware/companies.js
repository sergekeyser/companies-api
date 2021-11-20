const { query } = require('express-validator')
const { validationResult } = require('express-validator');
const genericValidationRules = require('../helpers/generic.validationrules')

exports.validate = (method) => {
        switch (method) {
                case ('get'): {
                  return [
							query('lastReportedFrom', genericValidationRules.timeRFC933UTC.error)
								.optional()
								.isString()
								.matches(genericValidationRules.timeRFC933UTC.regex),
							query('lastReportedTo', genericValidationRules.timeRFC933UTC.error)
								.optional()
								.isString()
								.matches(genericValidationRules.timeRFC933UTC.regex),
							query('page', genericValidationRules.page.error)
								.optional()
								.isInt(),
							query('resultsPerPage', genericValidationRules.resultsPerPage.error + "1000")
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


