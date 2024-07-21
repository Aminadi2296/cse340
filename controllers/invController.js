const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
 
const invCont = {}
 
/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null,
  })
}
 

/* ***************************
*  Build inventory by vehicle view
* ************************** */
invCont.buildByVehicleId = async function (req, res, next) {
  const vehicle_id = req.params.vehicleId

  const data = await invModel.getVehicleById(vehicle_id)

  let nav = await utilities.getNav(data.vehicle_id)
  const detail = await utilities.buildVehicleDetailHTML(data) 

  res.render("./inventory/detail", {
    title:" vehicles",
    nav,
    detail,
  })
}

invCont.buildManagement = async (req, res, next) =>{
  let nav = await utilities.getNav();
  const links = {
    "classification": "/inv/add-classification",
    "inventory": "/inv/add-inventory"
  }
  res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      links    
  });
}

invCont.buildAddClassification = async (req, res) => {
  const nav = await utilities.getNav()

  res.render("inventory/add-classification", {
    title: "Add new classification",
    nav,
    errors: null,
  })
}

invCont.buildAddInventory = async (req, res) => {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()

  res.render("inventory/add-inventory", {
    title: "Add new inventory item",
    nav,
    classificationList,
    errors: null,
    formData: null
  })
}


module.exports = invCont