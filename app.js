const express= require('express')
const mustacheExpress = require('mustache-express')
const bodyParser= require('body-parser')
const uuidv1 = require('uuid/v1')
const path = require('path')
const session = require('express-session')
//const tripRoutes = require('./routes/trips')
const app = express()
const VIEWS_PATH = path.join(__dirname, './views')


let trips = []
let users = []


app.engine('mustache',mustacheExpress())
app.set ('views','./views')
app.set ('view engine','mustache')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/css',express.static('css'))
app.use('/js',express.static('js'))
//app.use('/',tripRoutes)
app.use(session({
    secret: "keyboard cat",
    resave:false,
    saveUninitialized: false

}))

app.get('/register',(req,res)=>{
    res.render('register')
})

app.get('/confirm',(req,res)=>{
    res.render('confirm',{person:people})
})
app.post('/register',(req,res)=>{
    let username= req.body.username
    let password= req.body.password
    
    let user={username:username,password:password}
    console.log(user)
    users.push(user)
    res.render("login",{login: "Please Log In"})
})

app.get('/trips',(req,res) => {
    let usertrips = trips.filter(trip=>trip.sessionid == req.session.username)
    res.render('trips',{triplist: usertrips})
  })
app.post("/trips",(req,res)=>{
    let destination = req.body.destination
    let dateDepart= req.body.dateDepart
    let datReturn = req.body.datReturn
    let imageUrl = req.body.imageUrl
    

    let trip = {id:id=uuidv1(),sessionid:req.session.username,destination: destination , dateDepart: dateDepart, datReturn:datReturn, imageUrl:imageUrl}
    trips.push(trip)
   
    console.log (trips)
    res.redirect('/trips')

})

app.post("/login",(req,res) => {

    let username = req.body.loginName
    let password = req.body.loginPassword
    console.log(username)
    console.log(password)
    console.log (users)
  
    let persistedUser = users.find((user) => {
      return user.username == username && user.password == password
    })
  
    if(persistedUser) {
      
      if(req.session){
          req.session.username = persistedUser.username
          
          
          res.render('trips',{username:req.session.username})
      }
  
    } else {
      //res.redirect('/login')
      res.render('login',{message: 'Invalid Credentials!!'})
    }
  
  })
  

app.post("/trips/delete",(req,res)=>{
   let tripId = req.body.id
   
    trips = trips.filter(trip=>trip.id != tripId)
    console.log (trips)
  
    res.redirect('/trips')
    })

app.get('/login',(req,res)=>{
    res.redirect('/trips')
})
app.post("/logout",(req,res)=>{
    req.session = null
  
    res.render('login',{logout:"Now Logged out / Log in again"})   
    }
   
)



app.listen(3000,()=>{
    console.log("At your service")
})