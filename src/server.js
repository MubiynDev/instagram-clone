const express = require("express");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const {PORT} = require("../config");
const mongoose = require("./modules/mongoose");
const http = require("http");
const messages = require("./models/messages")
const sessions = require("./models/sessions")
const users = require("./models/users")
const {verifyJWT} = require("./modules/jwt");
const { compareHash } = require("./modules/bcrypt");
const app = express();
const server = http.createServer(app)

const io = require("socket.io")(server)

mongoose()

server.listen(PORT, () => console.log(`SERVER READY AT http://localhost:${PORT}`));

// socket
io.on('connection', (socket) => {
    console.log(socket.id, " connected")

    socket.on("token", async token => {
        const { sessionId } = verifyJWT(token);
        const session = await sessions.findById(sessionId);
        const user = await users.findByIdAndUpdate(session.userId, {
            socketId: socket.id
        })
    })

    socket.on('new_message', async message => {
        const newMessage = await messages.create(message)
        const {receiverId} = message;
        const user = await users.findById(receiverId);
        socket.to(user.socketId).emit("new_message", newMessage)
    })

    socket.on('disconnect', () => {
        console.log(socket.id, " disconnected")
    })
})

// settings
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use("/public", express.static(path.join(__dirname, "public")))
app.use("/socket", express.static(path.join(__dirname, "..", "node_modules", "socket.io", "client-dist")))

fs.readdir(path.join(__dirname, "routes"), (err, files) => {
    if(!err) {
        files.forEach(file => {
            const routePath = path.join(__dirname, "routes", file);
            const route = require(routePath);

            if(route.path && route.router) app.use(route.path, route.router)
        })
    }
});
