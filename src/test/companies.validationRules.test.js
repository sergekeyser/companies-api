const expect = require('chai').expect;
const companiesValidations = require('../helpers/companies.validationRules')

describe('companies.validation RFC933 Format Test', () => {
	it ('should return true (success validation)', () => {
			const result = companiesValidations.nextReporting('2012-01-01T00:00:00Z')
			expect(result).to.equal(true)
	})
})

describe('companies.validation RFC933 Format Test Negative', () => {
	it ('should return false (failure validation)', () => {
			const result = companiesValidations.nextReporting('2012-0-01T00:00:00Z')
			expect(result).to.equal(false)
	})
})	

