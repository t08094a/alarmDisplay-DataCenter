let io;

exports.initialize = (app, httpServer) => {
    console.info('[SOCKET] initialize');

    io = require('socket.io')(httpServer);

    io.on('connection', (socket) => {
        // Log whenever a user connects
        console.info('[SOCKET] client connected');

        // Log whenever a client disconnects from our websocket server
        socket.on('disconnect', function () {
            console.info('[SOCKET] client disconnected');
        });
    });
}

exports.sendMessage = (event, message) => {
    console.info('[SOCKET] send message with event "%s":\n%s', event, message);
    io.emit(event, message);
}
