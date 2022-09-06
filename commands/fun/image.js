module.exports = {
    name: 'image',
    aliases: ['img', 'картинка'],
    description: 'Случайная картинка',
    category: 'Веселье',
    utilisation: '{prefix}image <животное>',

    async execute(client, message, args) {
        const { MessageEmbed } = require("discord.js");
        var request = require('then-request');
        const animal = require('animal-images-api')
        const fetch = require('node-fetch');
        var img


        
        const pet = args[0]
        switch (pet) {
            case 'Лиса':
            case 'лиса':
            case 'Fox':
            case 'fox':
                request('POST', 'https://randomfox.ca/floof/?ref=apilist.fun', {json: {some: 'values'}}).getBody('utf8').then(JSON.parse).done(function (res) {
                    message.channel.send(res.image);
                });
            break
            case 'Кот':
            case 'кот':
            case 'Cat':
            case 'cat':
                request('POST', 'https://aws.random.cat/meow', {json: {some: 'values'}}).getBody('utf8').then(JSON.parse).done(function (res) {
                    message.channel.send(res.file);
                });
            break
            case 'Утка':
            case 'утка':
            case 'Duck':
            case 'duck':
                function getRandomInt(max) {
                    return Math.floor(Math.random() * 9999999999999);
                }
                message.channel.send(`https://random-d.uk/api/randomimg?t=${getRandomInt(3)}`)
            break
            case 'птица':
            case 'Птица':
            case 'bird':
            case 'Bird':
                const res = await fetch('http://shibe.online/api/birds');
                const img = (await res.json())[0];
                message.channel.send(img);
            break
            default:
                const fs = require('fs')
                try {
                    const prefdb = fs.readFileSync('./json/prefixes/'+message.guild.id+'.json', 'utf8')
                    const prefdb2 = JSON.parse(prefdb)
                    prefix = prefdb2.prefix
                } catch {
                    prefix = client.config.discord.prefix
                }
                const embed = new MessageEmbed()
                    .setAuthor(`Список животных для "${prefix}image":`)
                    .setColor("BLUE").addFields(
                        {name: "__Русский__", value: "**Кот\nЛиса\nУтка\nПтица**", inline: true},
                        {name: "__English__", value: "**Cat\nFox\nDuck\nBird**", inline: true}
                    )
                message.channel.send(embed)
            break
        }
    },
};