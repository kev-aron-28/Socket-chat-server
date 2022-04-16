const Message = require("../models/message");

const socketController = (socket, io) => {
  const users = [];

  socket.join(socket.uid)

  for (let [_,socket] of io.of("/").sockets) {
    users.push({
      userID: socket.uid,
      username: socket.username,
      messages: [],
      status: 'connected'
    }); 
  }
  socket.broadcast.emit("user_connected", {
    userID: socket.uid,
    username: socket.username,
    messages: [],
    status: 'connected'
  });

  socket.on('private_message', async ({ content, from, to, date }) => {
    const message = new Message({ content, from, to, date, chatIds:[ from, to ] });
    await message.save()
    socket.to(to).to(socket.uid).emit('private_message', {
      content,
      from,
      to,
      name: socket.username,
      date
    })
  })

  socket.on('typing', ({ from, to, content }) => {
    socket.to(from).to(to).emit('typing', {
      from, 
      to,
      content
    })    
  })

  socket.on('disconnect', () => {
    io.emit('disconnected_user', {
      userID: socket.uid,
    });
  })

  io.emit('users', users);
};

module.exports = socketController;
