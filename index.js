import express from 'express'
import pg from 'pg'

const app = express()
const port = 3000
const { Pool } = pg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: 'Batam12345', 
    port: 5432,
})

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)
