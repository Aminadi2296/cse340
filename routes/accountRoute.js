const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/accountValidation")

router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get("/register", utilities.handleErrors(accountController.buildRegister));
router.post('/register', utilities.handleErrors(accountController.registerAccount));

router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))

// Process the login request
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
  )



  module.exports = router;