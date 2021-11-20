const { body } = require('express-validator')
const { validationResult } = require('express-validator');

exports.validate = (method) => {
        console.log('testing!')
	switch (method) {
		case ('post'): {
		  return [
                         body('companyId', 'companyId doesn\'t exist').exists()
		  ]
		}
	}
}

exports.createDate = async (req,res,next) => {
    try{
	   const errors = validationResult(req);
	console.log('testing2'+ req.body)
	if (!errors.isEmpty()) {
        console.log('testing3') 
	res.status(400).json({ errors: errors.array() });
        return;
      }
         console.log('testing4')
	res.status(200).json({ message: "sucess"});
	 } catch (err) {
		 return next(err)
	 }
}
