// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

router.get("/detail/:vehicleId", invController.buildByVehicleId);

router.get("/management", invController.buildManagement)

router.get("/add-classification", invController.buildAddClassification)
router.get("/add-inventory", invController.buildAddInventory)




module.exports = router;


