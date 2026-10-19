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

// DELETE (Hapus Data)
app.delete('/biodata/:id', (req, res) => {
    const { id } = req.params;

    pool.query(
        'DELETE FROM biodata WHERE id=$1 RETURNING *',
        [id]
    )
        .then(result => {
            if (result.rowCount === 0) {
                return res.status(404).json({
                    message: "Data tidak ditemukan"
                });
            }

            res.json({
                message: "Data berhasil dihapus",
                data: result.rows[0]
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
