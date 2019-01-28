// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments')
	require('dotenv').config()
}
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport')
const app = express()
const PORT = process.env.PORT || 8080

// ===== Middleware ====
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.APP_SECRET || 'super special password for lords',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser


// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	console.log('YOU ARE IN THE PRODUCTION ENV')
	app.use('/static', express.static(path.join(__dirname, '../build/static')))
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../build/'))
	})
}

/* Express app ROUTING */
app.use('/auth', require('./auth'))

// ====== Error handler ====
app.use(function (err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
});


// ===== Adding DB Schemas =====
var Dm = require('./db/models/Dm');
var GridMap = require('./db/models/GridMap');

// ===== Routes =====

//  ===== Creating a DM Session =====
app.post('/create/session', function (req, res) {
	Dm.create(
		{
			name: req.body.name,
			userId: req.body.userId,
			code: req.body.code
		}
	).then(function (result) {
		res.json(result);
	}).catch(function (err) {
		res.json(err);
	});
});

// ===== Find All Sessions For a User =====
app.get('/find/sessions/:userId', function (req, res) {
	Dm.find(
		{ userId: req.params.userId }
	)
		.then(dbItem => res.json(dbItem))
		.catch((err) => res.json(err));
});

//  ===== Find Specific Session =====
app.get('/session/load/:sessionId/:userId', function (req, res) {
	Dm.findById(
		{
			_id: req.params.sessionId,
			userId: req.params.userId
		}
	).populate('grid')
		.then(dbItem => res.json(dbItem))
		.catch((err) => res.json(err));
});

//  ===== Create New Grid Map =====
app.post('/grid/new', function (req, res) {
	GridMap.create(
		{
			name: req.body.name,
			grid: req.body.grid
		}
	).then(function (result) {
		res.json(result);
	}).catch(function (err) {
		res.json(err);
	});
});

//  ===== Save New Grid to Session Id =====
app.post('/session/grid', function (req, res) {
	Dm.findOneAndUpdate(
		{ _id: req.body.sessionId },
		{ $push: { grid: req.body.gridId	} }
	).then(function (result) {
		res.json(result);
	}).catch(function (err) {
		res.json(err);
	});
});


// ==== Starting Server =====
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
