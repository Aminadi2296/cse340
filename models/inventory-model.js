const pool = require("../database")
const { get } = require("../routes/static")


/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}


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

async function getInventoryDetailsById(inventory_id){
  try{
      const data = await pool.query(
          `SELECT *
          FROM public.inventory
          WHERE inventory_id = $1`, [inventory_id]
      );
      return data.rows;
  }catch(error){
      console.error("getInventoryDetailsById error: "+ error);
  }
 
}

/* ***************************
 *  Get vehicle details by vehicle_id
 * ************************** */
async function getVehicleById(vehicleId) {
  try {
    const query = {
      text: 'SELECT * FROM public.inventory WHERE inventory_id = $1',
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

async function addClassification (classification_name){
  try{
      const sql = pool.query(
          `INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *`,
          [classification_name]
      );
      return await pool.query(sql, [classification_name]);
  }
  catch(error){
      return error.message;
  }
}

async function addInventory(classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail,
  inv_price,inv_miles, inv_color) {
  try {
    const sql = "INSERT INTO public.inventory (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price,inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"
    return await pool.query(sql, [classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail,
      inv_price,inv_miles, inv_color])
  } catch (error) {
    return error.message
  }
}





module.exports = {getInventoryByClassificationId, getClassifications, getVehicleById, addClassification, addInventory, getInventoryDetailsById} 