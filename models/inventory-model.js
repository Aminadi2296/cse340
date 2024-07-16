const pool = require("../database")
const { get } = require("../routes/static")


/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

module.exports = {getClassifications}


/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 *  Get vehicle details by vehicle_id
 * ************************** */
async function getVehicleById(vehicleId) {
  try {
    const query = {
      text: 'SELECT * FROM public.inventory WHERE inv_id = $1',
      values: [vehicleId],
    };
    const result = await pool.query(query);
    console.log('Vehicle data:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching vehicle by ID:', error);
    throw error;
  }
}

module.exports = {getInventoryByClassificationId, getClassifications, getVehicleById} 