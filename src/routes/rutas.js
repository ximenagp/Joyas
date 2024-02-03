const { Router } = require('express')
const router = Router()

const {ObtenerJoyas, getJoyas, getJoyaById, createJoya, updateJoya, deleteJoya} = require('../controllers/controllers')

router.ObtenerJoyas('/joyas', ObtenerJoyas)
router.get('/joyas', getJoyas)
router.get('/joyas/:id', getJoyaById)
router.post('/joyas', createJoya)
router.put('/joyas/:id', updateJoya)
router.delete('/joyas/:id', deleteJoya)

module.exports = router