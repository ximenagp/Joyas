const createSQLquery = (dbTable, filters) => {
    let SQLquery = `SELECT * FROM ${dbTable.toLowerCase()} WHERE 1 = 1`
    let values = []
  
    Object.entries(filters).forEach(([key, value]) => {
      const valuePlaceholder = `$${values.length + 1}`

      switch (key) {
        case "precio_min":
          SQLquery += `AND precio >= ${valuePlaceholder}`
          break
        case "precio_max":
          SQLquery += `AND precio <= ${valuePlaceholder}`
          break
        default:
          SQLquery += `AND ${key} = ${valuePlaceholder}`
      }
        values.push(value)
    })
    return { SQLquery, values }
}

export default createSQLquery