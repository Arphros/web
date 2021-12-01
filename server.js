// Connect Express with Svelte
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");
const svelte = require("svelte/compiler");
