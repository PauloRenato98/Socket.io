
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  console.log("teste");
  res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', socket => {
  console.log('a user connected' + " " + socket.id);
  socket.on('disconnect', () => {
    console.log('a user disconectado' + " " + socket.id);
  });
});

io.emit('some event', { 
  someProperty: 'some value', 
  otherProperty: 'other value' 
}); // This will emit the event to all connected sockets


io.on('connection', socket => {
  socket.on('chat message', msg => {
    console.log(msg)
    io.emit('chat message', msg);
  });
});


/*http.listen(3000, () => {
  console.log('listening on *:3000');
});*/

var server_port = process.env.YOUR_PORT || process.env.PORT ||  3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port);

console.log('Listening on port %d', server_port);