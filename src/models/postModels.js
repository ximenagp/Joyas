import { pool } from "../../../../config/DB/db.js"
import format from "pg-format"
import createSQLquery from "../helpers/filter.js"

/*Esta función recupera datos de la tabla 'inventario' en una base de datos. 
Acepta tres parámetros: límite, página y order_by. 
El parámetro limit determina el número máximo de filas que se van a devolver. 
El parámetro page determina qué conjunto de filas se va a devolver, en función del límite. 
El parámetro order_by determina la columna y el orden por el que se ordenarán los resultados. 
Los valores predeterminados para estos parámetros son 6, 1 y "id_ASC", respectivamente.*/
export const getDataFilter = async (limit = 6, page = 1, order_by = "id_ASC") => {
  try {
    // El parámetro order_by se divide en dos partes: el nombre de la columna y el criterio de ordenación
    const [queryParam, queryValue] = order_by.split("_")
    // calcula el número de página y el límite.
    const offset = (page - 1) * limit
    // La consulta SQL se construye utilizando estos parámetros
    const SQLquery = format("SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s", queryParam, queryValue, limit, offset)
    // La consulta se ejecuta y los resultados se almacenan en la variable 'rows'.
    const { rows } = await pool.query(SQLquery)
    
    return rows
  } catch (error) {
    // si se registra un error
    console.error(`codigo error: ${error.code} -> ${error.message}`)
    throw new Error(`codigo: ${error.code} : ${error.message}`)
  }
}

/*
 Esta función filtra los datos de la base de datos en función de los filtros proporcionados. 
 - Crea una consulta SQL utilizando los filtros y la ejecuta. 
 - Si se produce un error durante la ejecución, registra el error y lo lanza. */

export const dbFilterData = async (filters) => {  //-filtros que se van a aplicar a los datos.
  try {
    const { SQLquery, values } = createSQLquery("inventario", filters);
    const { rows } = await pool.query(SQLquery, values);  //-filas de datos que coinciden con los filtros
    return rows;
  } catch (error) { 
    console.error(`Error code: ${error.code} -> ${error.message}`); //Si hay un error al ejecutar la consulta.
    throw new Error(`Code: ${error.code} : ${error.message}`);
  }
}
