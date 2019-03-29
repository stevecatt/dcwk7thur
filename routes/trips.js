const express= require('express')
const uuidv1 = require('uuid/v1')
const path = require('path')
const session = require('express-session')
const router = express.Router()

let trips = []
let users = []

router.use(session({
    secret: "keyboard cat",
    resave:false,
    saveUninitialized: false

}))


router.get('/register',(req,res)=>{
    res.render('register')
})

router.get('/confirm',(req,res)=>{
    res.render('confirm',{person:people})
})
router.post('/register',(req,res)=>{
    let username= req.body.username
    let password= req.body.password
    
    let user={username:username,password:password}
    console.log(user)
    users.push(user)
    res.render("login",{login: "Please Log In"})
})

router.get('/trips',(req,res) => {
    let usertrips = trips.filter(trip=>trip.sessionid == req.session.username)
    res.render('trips',{triplist: usertrips})
  })

router.post('/show',(req,res) => {
    let usertrips = trips.filter(trip=>trip.sessionid == req.session.username)
    res.render('trips',{triplist: usertrips})
  }) 
router.post("/trips",(req,res)=>{
    let destination = req.body.destination
    let dateDepart= req.body.dateDepart
    let datReturn = req.body.datReturn
    let imageUrl = req.body.imageUrl
    

    let trip = {id:id=uuidv1(),sessionid:req.session.username,destination: destination , dateDepart: dateDepart, datReturn:datReturn, imageUrl:imageUrl}
    trips.push(trip)
   
    console.log (trips)
    res.redirect('/trips')

})

router.post("/login",(req,res) => {

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
  

router.post("/trips/delete",(req,res)=>{
   let tripId = req.body.id
   
    trips = trips.filter(trip=>trip.id != tripId)
    console.log (trips)
  
    res.redirect('/trips')
    })

router.get('/login',(req,res)=>{
    res.redirect('/trips')
})
router.post("/logout",(req,res)=>{
    req.session = null
  
    res.render('login',{logout:"Now Logged out / Log in again"})   
    }
   
)
module.exports = router