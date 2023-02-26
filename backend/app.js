// app.js

const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const server = app.listen(8080, () => {
  console.log("listening on 8080");
});

const io = require("socket.io")(server);
const charCtr = require("./charCtr");

io.on("connect", (socket) => {
  console.log("Client Connected!");
  console.log(socket.id);
  charCtr.createChar(socket.id);
  io.emit("charListUpdate", charCtr.charList);

  socket.on("disconnect", () => {
    charCtr.deleteChar(socket.id);
    io.emit("charListUpdate", charCtr.charList);
  });

  socket.on("move", (data) => {
    charCtr.moveChar(socket.id, data.location);
    io.emit("charListUpdate", charCtr.charList);
  });

  socket.on("updateKeyPress", (keyPress) => {
    charCtr.updateKeyPress(socket.id, keyPress);
    io.emit("charListUpdate", charCtr.charList);
    console.log(charCtr.charList);
  });
});
