import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'
import Room from './templates/room'
import Player from './templates/player'
import * as bodyParser from 'body-parser'

const players: Player[] = []
const rooms: Room[] = [] 

const app = express()
const router = express.Router()
const server = http.createServer(app)
const ws = new WebSocket.Server({ server }) 

ws.on('connection', (socket) => {

})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router)

router.route('/players')
    .get((req, res) => {
        
        res.status(200) 
        res.json(JSON.stringify(players))
    })
    .post((req, res) => {
        let duplicate = players.find((el) => {
            return el.name === req.body.name
        })

        if(duplicate === undefined){
            res.status(200)
            res.json({'lol': 'xd'})
            players.push(new Player(req.body.name))
        }
        else{
            res.status(400)
            res.json({'error': 'Name is taken'})
        }
    })

router.route('/rooms')
    .get((req, res) => {
        res.status(200)
        res.json(JSON.stringify(rooms))
    })
    .post((req, res) => {
        let dupRoom = rooms.find((el) => {
            return el.name === req.body.name
        })

        let dupCreator = rooms.find((el) => {
            return el.creator === req.body.creator
        })

        let creatorExists = players.find((el) => {
            return el.name === req.body.creator
        })

        if(dupRoom || dupCreator || !creatorExists){
            res.status(400)
            res.json({'error': 'Only one room is allowed per player and room names must be unique'})
        }
        else{
            rooms.push(new Room(req.body.name, req.body.creator))
            res.status(200)
            res.json({'lol': 'xd'})
        }
    })


//só pra ver se funca
router.route('/test')
    .get((req, res) => {
        res.status(418)
        res.json({'ola': 'biba'})
    })

server.listen(process.env.PORT || 8000, () => {
    console.log('server started')
})