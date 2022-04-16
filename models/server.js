const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');

const dbConnection = require('../db/config');
const socketController = require('../controllers/socket');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.server = createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.apiPaths = {
            users: '/api/users',
            auth: '/api/auth',
            messages: '/api/messages'
        }

        this.connectDB();
        this.middlewares();
        this.routes();
        this.sockets();
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server listening in port ${this.port}`);
        })
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.io.use((socket, next) => {
            const username = socket.handshake.auth.username;
            const uid = socket.handshake.auth.uid;
            if (!username || !uid) {
              return next(new Error("invalid username"));
            }
            socket.username = username;
            socket.uid = uid;
            next();
        });
        this.app.use(express.static(path.resolve(__dirname, '../../client', 'dist')));

    }

    routes() {
        this.app.use(this.apiPaths.users, require("../routes/user"));
        this.app.use(this.apiPaths.auth, require("../routes/auth"));
        this.app.use(this.apiPaths.messages, require("../routes/message"));
        // this.app.get('*', (req, res) => {
        //     res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
        // });
    }

    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io));
    }

    async connectDB() {
        try {
            await dbConnection();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Server;