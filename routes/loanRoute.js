/*
Author: Jeremy Heiner
Class: IFT 458/598: Middleware Programming & Database Security
Professor: Dinesh Sthapit
Description: This is the loan router. It takes requests and directs them to the correct function in the controller.
*/


//Routes
const express = require('express')
const router = express.Router()
const loanController = require('../controllers/loanController')



router.route('/')
    .get (loanController.getData)
    //.post(loanController.createloan)

router.get('/loanUI', loanController.allLoans)

router.get('/AddLoan123', loanController.newLoanForm)
router.post('/AddLoan123', loanController.newLoan)
    
//localhost:3000/loan/api/    
router.route('/api')
    .get (loanController.getDataAPI)
    .post(loanController.createLoanAPI)

router.route('/api/:id')
    .get(loanController.getDataByID)
    .patch(loanController.updateloan)
    .delete(loanController.deleteloan)


loanData = loanController.getData()    

module.exports = router

