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
app.use(express.json());

//app.use('/public', express.static(__dirname + '/public'));
//app.set('view engine', 'ejs');


const { Server } = require("socket.io");
const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
});

io.on("connection", (socket) => {
    socket.on("chat message", (data) => {
        io.emit("message list", data);
    });
});