'use strict';

const axios = require('axios');
const { watchModel, userModel } = require('../Models/Watch.model');

const setSeedData = async () => {
    let url = `https://watches-world.herokuapp.com/watches-list/`;
    let watchData = await axios.get(url);
    let setData = watchData.data.map(elem => {
        return new watchModel({
            title: elem.title,
            description: elem.description,
            toUSD: elem.toUSD,
            image_url: elem.image_url,
        });
    });
    setData.map(elem => elem.save());
}

const getWatchs = async (req, res) => {
    let watchData = await watchModel.find({});
    res.status(200).json(watchData);
}

const createUser = async (req, res) => {
    let email = req.params.email;
    let checkEmail = await userModel.exists({ email });
    if (checkEmail) {
        res.status(200).send(`user exists`);
    } else {
        let newUser = new userModel({
            email: email,
        })
        newUser.save();
        res.status(200).send(`user created`)
    }
}

const getUser = async (req, res) => {
    let email = req.params.email;
    let user = await userModel.findOne({ email: email });
    res.status(200).json(user);
}

const addToFav = async (req, res) => {
    let email = req.params.email;
    let watchId = req.params.watchId;
    let user = await userModel.findOne({ email: email });
    let watch = await watchModel.findOne({ _id: watchId });
    user.favWatchs.push(watch);
    user.save();
    res.status(200).json(user);
}

const deleteFav = async (req, res) => {
    let email = req.params.email;
    let watchId = req.params.watchId;
    let user = await userModel.findOne({ email: email });
    user.favWatchs.map((elem, index) => {
        if (elem._id.toString() === watchId.toString()) {
            user.favWatchs.splice(index, 1);
        }
    });
    user.save();
    res.status(200).json(user);
}

const updateFav = async (req, res) => {
    let email = req.params.email;
    let watchId = req.params.watchId;
    let watchItem = req.body;
    let user = await userModel.findOne({ email: email });
    user.favWatchs.map(elem => {
        if (elem._id.toString() === watchId.toString()) {
            elem.title = watchItem.title;
            elem.description = watchItem.description;
            elem.toUSD = watchItem.toUSD;
            elem.image_url = watchItem.image_url;
        }
    });
    user.save();
    res.status(200).json(user);
}

module.exports = {
    setSeedData,
    getWatchs,
    createUser,
    getUser,
    addToFav,
    deleteFav,
    updateFav,
}