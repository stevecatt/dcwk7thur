const express= require('express')
const mustacheExpress = require('mustache-express')
const bodyParser= require('body-parser')
const uuidv1 = require('uuid/v1')
const path = require('path')
const session = require('express-session')
const tripRoutes = require('./routes/trips')
const app = express()
const VIEWS_PATH = path.join(__dirname, './views')
const server = require('http').createServer(app)
const io=require('socket.io')(server)


let messages = []
io.on('connection',(socket)=>{
    console.log("chat working")

socket.on('houston',(data) => {
    console.log(data)
    //messages.push(data)
    //socket.emit('houston',data)
    //socket.broadcast.emit('houston',data)
    io.sockets.emit('houston',data)
    messages.push(data)
    console.log (messages)
  })
  
})
app.engine('mustache',mustacheExpress())
app.set ('views','./views')
app.set ('view engine','mustache')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/css',express.static('css'))
app.use('/js',express.static('js'))
app.use('/',tripRoutes)
app.use(session({
    secret: "keyboard cat",
    resave:false,
    saveUninitialized: false

}))

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname+'/chat.html'))
  })

server.listen(3000,()=>{
    console.log("At your service")
})