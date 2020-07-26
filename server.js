const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')


// Initialize
const app = express()

// Body Parser
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

dotenv.config({ path: './.env' })


// Enable CORS
app.use(cors())

// Route Files
const MailRoutes = require('./routes/MailRouter')

// Mount Routers
app.use('/api/v1/mail', MailRoutes)



app.get('/', (req, res) => {
  return res.send('Hello World')
})


const PORT = process.env.port || 5600

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))