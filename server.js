'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();
const server = express();
server.use(cors());
server.use(express.json());
const PORT = process.env.PORT;
const MONGO_ATLAS = process.env.MONGO_ATLAS;

const { setSeedData, getWatchs, createUser, getUser, addToFav, deleteFav, updateFav } = require('./Controllers/watch.Controllers');

mongoose.connect(`${MONGO_ATLAS}`, { useNewUrlParser: true, useUnifiedTopology: true });


server.get('/', (req, res) => { res.status(200).json({ massage: "I am Working" }) });

server.get('/setData', setSeedData);
server.get('/getData', getWatchs);
server.post('/createUser/:email', createUser);
server.get('/getUser/:email', getUser);
server.post('/addToFav/:email/:watchId', addToFav);
server.delete('/deleteFav/:email/:watchId', deleteFav);
server.put('/updateFav/:email/:watchId', updateFav);


server.listen(PORT, () => console.log(`Listening to ${PORT}`));