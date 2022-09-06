module.exports = {
    name: 'weather',
    aliases: ['погода'],
    description: 'Погода в городе/стране',
    category: 'Статистики',
    utilisation: '{prefix}weather <страна/город>',

    async execute(client, message, args) {
        const { MessageEmbed } = require("discord.js");
        var weather = require('weather-js');

        
        weather.find({search: args.join(""), degreeType: "C"}, function (error, result){
            if(error) return message.channel.send("Укажите город!")
            if(!args[0]) return message.channel.send("Город не найден!")
            if(result === undefined || result.length === 0) return message.channel.send('Попробуйте еще раз!')
            var current = result[0].current
            var location = result[0].location
            const weatherinfo = new MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Погода для "${current.observationpoint}"`)
                .setThumbnail(current.imageUrl)
                .setColor('BLUE')
                .addField('Временная зона', `UTC${location.timezone}`, true)
                .addField('Температура', `${current.temperature}°`, true)
                .addField('Ветер', current.winddisplay, true)
                .addField('Ощущается', `${current.feelslike}°`, true)
                .addField('Влажность', `${current.humidity}`)
            return message.channel.send(weatherinfo)
        })
    },
};