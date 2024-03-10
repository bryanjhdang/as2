const express = require('express')
const app = express()

const { Pool } = require('pg')

var pool

pool = new Pool({
  user: 'postgres',
  host: 'db',
  password: 'root'
})

const port = 8080

// body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255), age INT)')
  res.send('Success!')
})

app.post('/users', async (req, res) => {
  const { name, age } = req.body
  const response = await pool.query('INSERT INTO users (name, age) VALUES ($1, $2)', [name, age])
  res.send("success")
})

app.get('/users', async (req, res) => {
  const response = await pool.query('SELECT * FROM users')
  res.send(response.rows)
})

app.listen(port, '0.0.0.0')
console.log(`Running on http://0.0.0.0:${port}`)
