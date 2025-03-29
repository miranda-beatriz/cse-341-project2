require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const gitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

const errorHandler = require("./middleware/errorHandler");

const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");

app.use(express.json());



app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json())
.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}))
.use(passport.initialize())
.use(passport.session())
.use((req, res, next)=> {
  res.setHeader("Acess-Control-Allow-Origin", "*");
  res.setHeader(
    "Acess-Control-Allow-Header",
    "Origin,X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
  );
  res.setHeader(
    "Acess-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, OPTIONS, DELETE"
  );
  next();
})
.use(cors({methods: ['GET','POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
.use(cors({origin: '*'}));


const routes = require('./routes/index'); 
const { body } = require('express-validator');
app.use('/', routes);  

passport.use(new gitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(acessToken, refreshToken, profile, done){
  return done(null, profile);
}
));

passport.serializeUser((user, done) => {
  done(null,user);
});

passport.deserializeUser((user,done)=>{
  done(null,user);
});

app.use(errorHandler);

app.get('/', (req, res) => {res.send(req.session.user !== undefined? 'Logged in as ${req.session.user.displayName}' : "Logged Out")});

app.get('/github/callback', passport.authenticate('github',{
  failureRedirect: '/api-docs', session:false}),
(req,res) => {
  req.session.user = req.user;
  res.redirect('/');
}
)
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node Running on port ${port}`);
    });
  }
});



