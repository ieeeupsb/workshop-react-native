"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
const server = http.createServer(app);
const ws = new WebSocket.Server({ server });
ws.on('connection', (socket) => {
});
server.listen(process.env.PORT || 8000, () => {
    console.log('server started');
});
