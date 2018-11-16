let io;

exports.initialize = (app) => {
    const http = require('http').createServer(app);
    io = require('socket.io')(http);

    io.on('connection', (socket) => {
        // Log whenever a user connects
        console.log('[SOCKET] client connected');

        // Log whenever a client disconnects from our websocket server
        socket.on('disconnect', function () {
            console.log('[SOCKET] client disconnected');
        });
    });
}

exports.sendMessage = (event, message) => {
    console.log('[SOCKET] send message with event "%s":\n%s', event, message);
    io.emit(event, message);
}
