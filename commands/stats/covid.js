module.exports = {
    name: 'covid',
    aliases: ['covid-19'],
    description: 'Статистика коронавируса',
    category: 'Статистики',
    utilisation: '{prefix}covid <страна>',

    async execute(client, message, args) {
        const axios = require('axios');
        const countries = require("../../countries.json");
        const url = 'https://api.covid19api.com/total/country/'
        const content = message.content.split(/[ ,]+/);
        const { MessageEmbed } = require("discord.js");


        if(content.length > 2){
            message.reply("Страна не найдена!")
        }
        else if(content.length === 1){
            message.reply("Страна не найдена!")
        }
        else if(!countries[content[1]]){
            message.reply("Страна не найдена!")
        }
        else{
          const slug = content[1]
          const payload = await axios.get(`${url}${slug}`)
          const covidData = payload.data.pop();
          const embed = new MessageEmbed()
          .setAuthor("Статистика Коронавируса")
          .setColor("BLUE").addFields(
              {name: "Заболело", value: `__${covidData.Confirmed}__`, inline: true},
              {name: "Выздоровело", value: `__${covidData.Recovered}__`, inline: true}
          ).addFields(
              {name: "Болеет", value: `__${covidData.Active}__`, inline: true},
              {name: "Кол-во смертей", value: `__${covidData.Deaths}__`, inline: true}
          )
          message.channel.send(embed)
        }
    },
};