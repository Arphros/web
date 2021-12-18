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
var corsOptions = {
    origin: "*",
}
app.use(cors(corsOptions));


//app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

app.use('/storage', express.static(__dirname + '/storage'));
app.use('/blogs', express.static(__dirname + '/blog'));
app.use('/levels', express.static(__dirname + '/levels'));
//app.set('view engine', 'ejs');


const { Server } = require("socket.io");
const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
});

io.on("connection", (socket) => {
    let onlineUsersId = [];
    socket.on("chat message", (data) => {
        let msg = data;
        msg.timestamp = Date(Date.now()).split(' ').slice(1, 5).join(" ");
        io.emit("message list", msg);
    });
    socket.on('new connected', () => {
        io.emit('new connected')
    })
    socket.on('user connected', (data) => {
        if(onlineUsersId.includes(data.id)) return;
        onlineUsersId.push(data.id);
        io.emit('user list', onlineUsersId);
    })
    socket.on('new drop', (data) => {
        onlineUsersId = onlineUsersId.filter(id => id !== data.id);
        io.emit('user list', onlineUsersId);
    })
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

app.get('/blogs/getAllBlogs', (req, res) => {
    const limit = req.query.limit ?? 10000;
    let allBlogDir = fs.readdirSync(`${process.cwd()}\\blog`);
    let blogs = [];
        for (const folder of allBlogDir) {
        const blogFolder = fs.readdirSync(`${process.cwd()}\\blog\\${folder}`);
        for (const file of blogFolder) {
            if(blogs.length < Number(limit)) {
                const blog = fs.readFileSync(`${process.cwd()}\\blog\\${folder}\\${file}`, 'utf8')
                const title = blog.match(/<!-- TITLE: (.*) -->/)[1];
                const author = blog.match(/<!-- AUTHOR: (.*) -->/)[1];
                const dateWritten = blog.match(/<!-- DATE_WRITTEN: (.*) -->/)[1];
                const tags = blog.match(/<!-- TAGS: (.*) -->/)[1].split(',');
                blogs.push([{
                    id: Number(file.split('.')[0]),
                    title: title,
                    author: author,
                    dateWritten: dateWritten,
                    tags: tags,
                    content: blog
                }])
            }
        }
    }
    return res.send({ blogs: blogs });
})

app.get('/blogs/getBlog', (req, res) => {
    const blogId = req.query.id;
    const isBlogExists = fs.existsSync(`${process.cwd()}\\blog\\${blogId}\\${blogId}.md`);
    if (!blogId || !isBlogExists) {
        return res.status(400).send({ err: "Blog does not exists" });
    }
    const blog = fs.readFileSync(`${process.cwd()}\\blog\\${blogId}\\${blogId}.md`, 'utf8');
    const title = blog.match(/<!-- TITLE: (.*) -->/)[1];
    const author = blog.match(/<!-- AUTHOR: (.*) -->/)[1];
    const dateWritten = blog.match(/<!-- DATE_WRITTEN: (.*) -->/)[1];
    const tags = blog.match(/<!-- TAGS: (.*) -->/)[1].split(',');

    return res.send({
        title: title,
        author: author,
        dateWritten: dateWritten,
        tags: tags,
        content: blog,
    });
})

app.get('/blog/search', async (req, res) => {
    const query = req.query.query;
    if(!query) {
        return res.status(400).send({ err: "Bad request" });
    }
    let allBlogDir = fs.readdirSync(`${process.cwd()}\\blog`);
    let blogs = [];
    for (const folder of allBlogDir) {
        const blogFolder = fs.readdirSync(`${process.cwd()}\\blog\\${folder}`);
        for (const file of blogFolder) {
                const blog = fs.readFileSync(`${process.cwd()}\\blog\\${folder}\\${file}`, 'utf8')
                const title = blog.match(/<!-- TITLE: (.*) -->/)[1];
                const author = blog.match(/<!-- AUTHOR: (.*) -->/)[1];
                const dateWritten = blog.match(/<!-- DATE_WRITTEN: (.*) -->/)[1];
                const tags = blog.match(/<!-- TAGS: (.*) -->/)[1].split(',');
                blogs.push({
                    id: Number(file.split('.')[0]),
                    title: title,
                    author: author,
                    dateWritten: dateWritten,
                    tags: tags,
                    content: blog
                })
            }
        }

    const filteredBlogs = blogs.filter(blog => {
        return blog.title.toLowerCase().includes(query.toLowerCase()) ||
            blog.author.toLowerCase().includes(query.toLowerCase()) ||
            blog.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    })
    return res.send({ blogs: filteredBlogs });
})