const { Router } = require('express')
const router = Router()

// Importación de las funciones necesarias desde el archivo de controladores
const {
  getJoyas, 
  getJoyaById, 
  createJoya, 
  updateJoya, 
  deleteJoya
} = require('../controllers/controllers');

// definicion de rutas para el endpoint
router.route('/joyas')
  .get(getJoyas) // GET 
  .post(createJoya); // POST crea una nueva joya o elemento
// define las rutas'/joyas/:id'
router.route('/joyas/:id')
  .get(getJoyaById) // GET solicitud para ver un elemento por ID
  .put(updateJoya) // PUT ractualiza un elemento porID
  .delete(deleteJoya); // DELETE elimina o borra un elemento por ID

// exportación del modulo
module.exports = router;
