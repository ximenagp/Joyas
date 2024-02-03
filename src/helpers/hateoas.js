import { db, PORT } from "../../../../config/DB/config.js"

const prepareHateoas = (dbTable, data) => {
  return {
    total: data.length,
    results: data.map(({ nombre: name, id }) => ({
      name,
      href: `http://${db.host}:${PORT}/${dbTable}/${id}`,
    })),
  }
}

export default prepareHateoas