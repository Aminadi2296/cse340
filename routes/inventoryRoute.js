// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const validate = require("../utilities/inventoryValidation")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

router.get("/detail/:vehicleId", invController.buildByVehicleId);

router.get("/management", invController.buildManagement)

router.get("/add-classification", invController.buildAddClassification)
router.post('/add-classification', validate.classificationRules(), invController.addClassification)

router.get("/add-inventory", invController.buildAddInventory)
router.post('/add-inventory',
    validate.inventoryRules(),
    validate.checkInventory,
    invController.addNewVehicle)




module.exports = router;


