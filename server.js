if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const path = require('path')

// Validate env
if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not defined.')
    process.exit(1)
}

// View setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// Middleware for forms
app.use(express.urlencoded({ extended: false }))

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('✅ Connected to Mongoose'))

// Routes
const indexRouter = require('./routes/index')
app.use('/', indexRouter)

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
})
