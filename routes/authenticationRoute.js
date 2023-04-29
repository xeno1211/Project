/*
Author: Jeremy Heiner
Class: IFT 458/598: Middleware Programming & Database Security
Professor: Dinesh Sthapit
Description: This is the user route. It takes requests and directs them to the correct function in the controller.
*/

const express = require('express')
const router = express.Router()
const authenticationController = require('../controllers/authenticationController')

router.get('/home', authenticationController.home)
router.get('/signup', authenticationController.register)
router.post('/signup', authenticationController.signup)

router.get('/login', authenticationController.loginForm)
router.post('/login', authenticationController.login)

router.post('/logout', authenticationController.logout)

router.get('/userUI', authenticationController.allUsers)

router.route('/api')
    .get (authenticationController.getDataAPI)
    .post(authenticationController.createUserAPI)

module.exports = router