const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const cors = require("cors");
app.use(cors());
//app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  let msgArr = [];
  socket.on("chat message", (data) => {
    if(!data) return io.emit("message list", msgArr);
    msgArr.push(data);
    msgArr === 30 ? msgArr.shift() : null;
    io.emit("message list", msgArr);
  });
});