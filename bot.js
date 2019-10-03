const Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
const http = require('http');
const fs = require('fs');
const { google } = require('reverse-image-search');
const path = require('path');
const os = require('os');
var TinyURL = require('tinyurl');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (!msg.author.username.includes("Pokécord")) {
        return
    }

    if (msg.content.includes("This is the wrong pokémon!")) {
        client.channels.get(msg.channel.id).send("Wow I can't believe you guessed wrong. You moron. You idiot. You absolute fool. I even pasted the correct answer. You are such a monumental idiot that you don’t even realize what you just said. I am a verbal magician and you, my friend, are a naive simpleton. Your family line deserves to die with you.");
    }

    if (!msg.embeds) {
        return
    }

    msg.embeds.forEach(function (item, index) {
        if (item.title.includes("A wild pokémon has аppeаred!") || item.description.includes("A wild pokémon has аppeаred!")) {
            google.searchByImageURL({
                imageURL: item.image.url
            }).then(result => {

                TinyURL.shorten(result).then(function (shortenedURL) {
                    client.channels.get(msg.channel.id).send(shortenedURL);
                }, function (err) {
                    console.log(err)
                })

            }).catch(err => {
                console.error(err);
            });

            return
        }
    });

});

client.login(auth.token);