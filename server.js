const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000
// middlewares
app.use(express.json())
app.use(cors())
app.use(logger())
app.use(router)

// Routes
app.use((err, req, res, next) => {
    res.status(500).json({
        status: "error",
        message: `${err.message} Algo salió mal`,
    })
})

app.listen(PORT, error => error ? console.error("crash!!! ☠ ☠", error) : console.log(`http://${db.host}:${PORT} ,conectado`))

export const getHATEOAS = async (req, res, next) => {
    try {
        const { limit, page, order_by } = req.query

        const result = await getDataFilter(limit, page, order_by)
        const formatHATEOAS = await prepareHateoas("joyas", result)
        const paginatedFormatData = pagination(formatHATEOAS, limit, page)

        return res.status(200).json(paginatedFormatData)
    } catch (error) {
        return next(error)
    }
}

export const getDBfilters = async (req, res, next) => {
    try {
        const result = await dbFilterData(req.query)
        res.status(200).json({ result })
    } catch (error) {
        next(error)
    }
}