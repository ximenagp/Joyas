import { dbFilterData, getDataFilter } from "../models/postModels.js"
import prepareHateoas from "../helpers/hateoas.js"
import pagination from "../helpers/paginator.js"

/*const ObtenerJoyas = async ({limits=10}) => {
    let consulta = 'SELECT * FROM inventario LIMITS $1'
    const { rows: inventario } = await pool.query(consulta,
        [limits])
        return inventario
}*/
/*función es una función asíncrona llamada 'getHATEOAS' Se utiliza para obtener datos de una base de datos, formatear los datos mediante HATEOAS y, a continuación, enviar una respuesta paginada*/
export const getHATEOAS = async (req, res, next) => {
  // Desestructurar las propiedades 
  const { limit, page, order_by } = req.query;
  try {
        const result = await getDataFilter(limit, page, order_by);
    const formatHATEOAS = await prepareHateoas("joyas", result);

    res.status(200).json(pagination(formatHATEOAS, limit, page));
  } catch (error) {
    
    next(error);
  }
};

/*
 - Esta función es un middleware para obtener filtros de la consulta de solicitud y datos de la base de datos en función de estos filtros. 
 - Envía una respuesta JSON con el resultado. 
 - Si se produce un error, pasa el error al siguiente middleware.
  */
export const getDBfilters = async (req, res, next) => {
  try {
    const filters = req.query;
    const result = await dbFilterData(filters);
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
}