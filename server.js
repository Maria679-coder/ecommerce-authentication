require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./database/db')
const router = require('./routes/admin.routes')
const port = process.env.PORT

connectDB()

app.use(express.json())
app.use('/api/v1', router)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})