// validador

const getTableHeaders = async () => {
  const tableQuery = "SELECT column_name FROM information_schema.columns WHERE table_name =  'inventario'"
  const { rows: tableHeaders } = await pool.query(tableQuery)
  console.log(tableHeaders)
}
  