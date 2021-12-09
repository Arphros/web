const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const fs = require('fs')

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const cors = require("cors");
app.use(cors());


//app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

app.use('/storage', express.static(__dirname + '/storage'));
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
        let msg = data;
        msg.timestamp = Date(Date.now()).split(' ').slice(1, 5).join(" ");
        io.emit("message list", msg);
    });
});

app.post('/user/avatar', (req, res) => {
    let id = req.body.id;
    let rawImage = req.body.image;

    if (!id || !rawImage) {
        return res.status(300).send({ message: "Bad request" })
    }
    fs.writeFile(
        `${process.cwd()}\\storage\\avatar\\${id.toString()}.png`,
        rawImage.split(',')[1],
        'base64',
        (err) => {
            if (err) {
                console.log(err);
                return res.status(300).send({ message: "Error!", description: "Write file error!" })
            } else {
                return res.status(200).send({ message: "Success!" })
            }
        });
})

app.post('/user/banner', (req, res) => {
    let id = req.body.id;
    let rawImage = req.body.image;

    if (!id || !rawImage) {
        return res.send({err: "Bad request"})
    }
    fs.writeFile(
        `${process.cwd()}\\storage\\banner\\${id.toString()}.png`,
        rawImage.split(',')[1],
        'base64',
        (err) => {
            if (err) {
                console.log(err);
                return res.status(300).send({ message: "Error!" })
            } else {
                return res.status(200).send({ message: "Success!" })
            }
        });
})