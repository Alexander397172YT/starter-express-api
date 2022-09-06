const { MessageEmbed, WebhookClient } = require("discord.js");
const webhookGuilds = new WebhookClient('907714364453322792', '8hIRuIpww0nRJLURL9hp_LFjyHLIszKP1cAWxpdQ55UizkVxov8SiaIpGD14JtQDsjnq')

module.exports = async (client, guild) => {
    
    var found = false;
    guild.channels.cache.forEach(function(channel, id) {
        // If a channel is already found, nothing more needs to be done
        if(found == true || channel.type != "text") {
            return;
        }
        // If the channel isn't found and the bot has permission to 
        // send and read messages in the channel, send a welcome message there
        if(guild.me.permissionsIn(channel).has("SEND_MESSAGES") && guild.me.permissionsIn(channel).has("VIEW_CHANNEL")) {
            found = true;
            return channel.send("Спасибо, что добавили!\nСписок всех команд: +help\n**Рекомендуется поместить роль Бота на самый верх в настройках сервера, чтобы все функции работали корректно!**")
        }
    })
        const embed = new MessageEmbed()
            .setTitle(`Бот добавлен на сервер`)
            .setColor('GREEN')
            .setThumbnail(guild.iconURL)
            .addFields(
                {
                    name: 'Название',
                    value: guild.name,
                },
                {
                    name: 'ID',
                    value: guild.id,
                },
                {
                    name: 'Регион',
                    value: guild.region,
                },
                {
                    name: 'Количество Участников',
                    value: guild.memberCount,
                },
                {
                    name: 'Время Бездействия',
                    value: `${guild.afkTimeout / 60} минут`,
                }
            )

        webhookGuilds.send(embed)
}