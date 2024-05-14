/* NodeServerwhich will handle socket io connection*/
const io = require('socket.io')(8008)




const users = {};
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        // if nay new user joins,let other users connected to the server know!
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
        alert("hii")
    });




    // if someone sends a message,broadcast it to the other people
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });


    // if someone leaves the chat,let others know

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];

    });
})