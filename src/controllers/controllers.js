import { dbFilterData, getDataFilter } from "../models/postModels.js"
import prepareHateoas from "../helpers/hateoas.js"
import pagination from "../helpers/paginator.js"

/*const ObtenerJoyas = async ({limits=10}) => {
    let consulta = 'SELECT * FROM inventario LIMITS $1'
    const { rows: inventario } = await pool.query(consulta,
        [limits])
        return inventario
}*/
export const getHATEOAS = async (req, res, next) => {
    const { limit, page, order_by } = req.query
    try {
      const result = await getDataFilter(limit, page, order_by)
      const formatHATEOAS = await prepareHateoas("joyas", result)
      res.status(200).json(pagination(formatHATEOAS, limit, page))
    } catch (error) {
      next(error)
    }
  }

  export const getDBfilters = async (req, res, next) => {
    try {
      const filters = req.query
      const result = await dbFilterData(filters)
      res.status(200).json({ result: result })
    } catch (error) {
      next(error)
    }
  }