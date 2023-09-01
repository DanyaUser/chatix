const express = require('express');
const app = express();
const PORT = 5050;

const http = require('http').createServer(app);
const socketIO = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:5173'
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/welcome/welcock.html');
});

app.use(express.static(__dirname + '/welcome'));
app.use(express.static(__dirname + '/chat'));

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user connected`);
    
    // socket.emit('message', 'You have connected.');

    socket.on('setUsername', (username) => {
        socket.username = username;
        console.log(`${socket.id} set username to ${username}`);
    });

    socket.on('message', (message) => {
        socketIO.emit('message', { sender: socket.username, message });
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    });
});



http.listen(PORT, () => {
    console.log(`Server is alive on port ${PORT}`);
});
