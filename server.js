// Import de modulos e inicializacion de express app
const express = require('express')
const app = express()

// puerto del servidor
const PORT = process.env.PORT || 3000

// middlewares para el análisis de JSON, CORS, registro y enrutamiento
app.use(express.json())
app.use(cors())
app.use(logger())
app.use(router)

// manejo de error
app.use((err, req, res, next) => {
    // Send error response with status 500
    res.status(500).json({
        status: "error",
        message: `${err.message} Algo salió mal`,
    })
})


app.listen(PORT, error =>

    error ? console.error("crash!!! ☠ ☠", error) : console.log(`http://${db.host}:${PORT} ,conectado`)
)

// Funcion para obtener datos de HATEOAS
export const getHATEOAS = async (req, res, next) => {
    try {
        // Destructuracion del limite y la pagina
        const { limit, page, order_by } = req.query

        // Get data with the specified filters
        const result = await getDataFilter(limit, page, order_by)
        // Preparación de los datos HATEOAS
        const formatHATEOAS = await prepareHateoas("joyas", result)
        const paginatedFormatData = pagination(formatHATEOAS, limit, page)
        // Paginate the data

        return res.status(200).json(paginatedFormatData)
        // Envia respuesta con el estado 200 y datos paginados
    } catch (error) {
        return next(error)
    }

}

export const getDBfilters = async (req, res, next) => {
    try {
        // Función para obtener datos con filtros especificados de la base de datos
        const result = await dbFilterData(req.query)
        res.status(200).json({ result })
    } catch (error) {
        next(error)
    }
}