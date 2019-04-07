const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
var history=require('connect-history-api-fallback')
const addBusinessRoutes = require('./routes/business-route')
const addAppointsRoutes = require('./routes/appoints-route')
// const addReviewRoutes = require('./routes/review-route')
const addUserRoutes = require('./routes/user-route')

const app = express()
app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true // enable set cookie
}));

app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
  secret: 'puki muki',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(history())

app.use(express.static('public'));
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

addBusinessRoutes(app)
addAppointsRoutes(app)
// addReviewRoutes(app)
addUserRoutes(app)

// const PORT = process.env.PORT || 3003;
// app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
