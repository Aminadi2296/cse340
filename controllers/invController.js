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
  res.render("./inventory/classification", {
    title: " vehicles",
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
    errors: null
  })
}

invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body
  const saveResult = await invModel.addClassification(classification_name)
  let nav = await utilities.getNav();
  if (saveResult){
   
    req.flash("success", `Classification ${classification_name} was successfully added.`);
    res.status(201).render("inventory/management",{
        nav,
       
        title: "Inventory Management",
        errors: null
    });
}else{
 
  req.flash("notice",`Sorry, something went wrong adding ${classification_name}.`)
  res.status(501).render("inventory/newClassification",{
      nav,
      title: "Add New Classification",
      errors: null,
      classification_name
  })
}
}
// invCont.addInventory = async (req, res) => {
//   const saveResult = await invModel.saveInventory(req.body)
//   const nav = await utilities.getNav()
//   const classificationList = await utilities.buildClassificationList(req.body.classification_id)

//   const vars = {
//     title: "Add new inventory item",
//     nav,
//     classificationList,
//     errors: null,
//     formData: req.body
//   }

//   if (saveResult) {
//     req.flash(
//       "notice",
//       `Congratulations, a new inventory item - 
//       ${req.body.inv_make} ${req.body.inv_model} was successfully saved.`
//     )
//     res.status(201).render("inventory/add-inventory", vars)
//   } else {
//     req.flash("notice",
//       `Sorry, an inventory item - ${req.body.inv_make} ${req.body.inv_model} was not saved.`)
//     res.status(501).render("inventory/add-inventory", vars)
//   }
// }


invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body
  const saveResult = await invModel.addClassification(classification_name)
  let nav = await utilities.getNav();
  if (saveResult){
   
    req.flash("success", `Classification ${classification_name} was successfully added.`);
    res.status(201).render("inventory/management",{
        nav,
       
        title: "Inventory Management",
        errors: null
    });
}else{
 
  req.flash("notice",`Sorry, something went wrong adding ${classification_name}.`)
  res.status(501).render("inventory/newClassification",{
      nav,
      title: "Add New Classification",
      errors: null,
      classification_name
  })
}
}

// ADD NEW VEHICLE

invCont.addNewVehicle = async (req, res) => {
  const {inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail,
    inv_miles, inv_color, inv_price, classification_id} = req.body;
  const saveResult = await invModel.addInventory (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail,
    inv_price,inv_miles, inv_color)
 
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList(req.body.classification_id)
 
  const vars = {
    title: "Add new inventory item",
    nav,
    classificationList,
    errors: null,
    formData: req.body
  }
 
  if (saveResult) {
    req.flash(
      "notice",
      `Congratulations, a new inventory item -
      ${req.body.inv_make} ${req.body.inv_model} was successfully saved.`
    )
    res.status(201).render("inventory/newVehicle", vars)
  } else {
    req.flash("notice",
      `Sorry, an inventory item - ${req.body.inv_make} ${req.body.inv_model} was not saved.`)
    res.status(501).render("inventory/newVehicle", vars)
  }
}


module.exports = invCont