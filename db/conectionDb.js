import 'dotenv/config'
import pg from 'pg'

const pool= new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    allowExitOnIdle: true
})
export default pool