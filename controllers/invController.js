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

  const data = await invModel.getInventoryByVehicleId(vehicle_id)

  let nav = await utilities.getNav(data.classification_id)
  const detail = await utilities.buildDetailPage(data) 

  
  res.render("inventory/detail", {
    title: `${data.inv_make} ${data.inv_model}`,
    nav,
    detail,
    errors: null,
  })
}


module.exports = invCont