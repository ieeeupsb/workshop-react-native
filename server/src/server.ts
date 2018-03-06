import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

const app = express()

const server = http.createServer(app)

const ws = new WebSocket.Server({ server })

ws.on('connection', (socket) => {

})

server.listen(process.env.PORT || 8000, () => {
    console.log('server started')
})