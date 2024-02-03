import { pool } from "../../../../config/DB/db.js"
import format from "pg-format"
import createSQLquery from "../helpers/filter.js"

export const getDataFilter = async (limit = 6, page = 1, order_by = "id_ASC") => {
  try {
    const [queryParam, queryValue] = order_by.split("_")
    const offset = (page - 1) * limit
    const SQLquery = format("SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s", queryParam, queryValue, limit, offset)
    const { rows } = await pool.query(SQLquery)
    return rows
  } catch (error) {
    console.error(`codigo error: ${error.code} -> ${error.message}`)
    throw new Error(`codigo: ${error.code} : ${error.message}`)
  }
}

export const dbFilterData = async (filters) => {
  try {
    const { SQLquery, values } = createSQLquery("inventario", filters)
    const { rows } = await pool.query(SQLquery, values)
    return rows
  } catch (error) {
    console.error(`codigo error: ${error.code} -> ${error.message}`)
    throw new Error(`codigo: ${error.code} : ${error.message}`)
  }
}
