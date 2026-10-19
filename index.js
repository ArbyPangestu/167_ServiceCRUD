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

// GET ALL
app.get('/', (req, res) => {
    console.log("TEST DATA :");

    pool.query('SELECT * FROM biodata ORDER BY id')
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

