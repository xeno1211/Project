/*
Author: Jeremy Heiner
Class: IFT 458/598: Middleware Programming & Database Security
Professor: Dinesh Sthapit
Description: This is the loan controller.
When a loan is created, the router will route here and call the correct function for whatever is needing to be done.
*/

//console.log("Test function")
const Loan = require('../models/loanModel')
exports.getData = async (req, res) => {
    const loans = await Loan.find()
    //console.log("Loans: " + loans)
    return await loans
    // res.status(200).json({
    //     status: "success",
    //     results: loans.length,
    //     data: {
    //         loans
    //     }
    //})
}

exports.allLoans = async (req, res) => {
  const loans = await Loan.find()  
  //const data = getData()
  //console.log("Data: " + loans) 
  
  res.status(200).render('allLoans',{data: loans})
}

exports.getDataAPI = async (req, res) => {
  const loans = await Loan.find()
  res.status(200).json({
      status: "success",
      results: loans.length,
      data: {
          loans
      }
  })
}


exports.getDataByID = async (req, res) => {
    const {id} = req.params
    const loans = await Loan.find({_id: id})
    res.status(200).json({
        status: "success",
        results: loans.length,
        data: {
            loans
        }
    })
}

exports.createLoanAPI = async  (req, res) => {
  try {
    // const newloan = new loan({})
    // newloan.save()

    const newloan = await Loan.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        loan: newloan
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.newLoanForm = async (req, res) => {
  
  res.status(200).render('AddLoan',{pageTitle: 'Create new loan'})
}

exports.newLoan = async (req, res) => {
  const { customerName, customerEmail, loanAmount, interest,loanType,loanTermYears  } = req.body
  try{
      Loan.create({
        customerName:customerName,
        customerEmail: customerEmail,
        loanAmount: loanAmount,
        interest: interest,
        loanType: loanType,
        loanTermYears: loanTermYears,
      }).then(loan => res.json(loan))
  } catch(error){
      console.log(error)
      const errors = validationResult(req)
      const errorDetails = [
          {
              "location": "Authorization",
              "msg": `${customerName} ${error}`,
              "param": customerName
          }
      ]
      res.json({errors: errorDetails})
  }
}

exports.createloan = async  (req, res) => {
    try {
      // const newloan = new loan({})
      // newloan.save()
  
      const newloan = await Loan.create(req.body);
  
      res.status(201).json({
        status: 'success',
        data: {
          loan: newloan
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err
      });
    }
  };
exports.updateloan = async (req, res) => {
    try {
      const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      res.status(200).json({
        status: 'success',
        data: {
          loan
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };

  exports.deleteloan = async (req, res) => {
    try {
      await Loan.findByIdAndDelete(req.params.id);
  
      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };

  //module.exports = controller