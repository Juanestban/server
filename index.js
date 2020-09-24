const taskRoutes = require('./routes/taskRoutes')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors');

const app = express();

// settings
app.set('port', process.env.PORT || 4000)

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use(taskRoutes)

// starting server
app.listen(app.get('port'), () => console.log('server on port', app.get('port')))
