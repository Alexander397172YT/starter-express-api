module.exports = {
    name: 'serverinfo',
    aliases: ['server'],
    description: 'Информация о Сервере',
    category: 'Статистики',
    utilisation: '{prefix}serverinfo',

    async execute(client, message, args) {
        const { MessageEmbed } = require("discord.js");


        const icon = message.guild.iconURL()

        const embed = new MessageEmbed()
            .setTitle(`Информация о "${message.guild.name}"`)
            .setThumbnail(icon)
            .addFields(
                {
                    name: 'Регион',
                    value: message.guild.region,
                },
                {
                    name: 'Количество Участников',
                    value: message.guild.memberCount,
                },
                {
                    name: 'Владелец',
                    value: message.guild.owner.user.tag,
                },
                {
                    name: 'Время Бездействия',
                    value: `${message.guild.afkTimeout / 60} минут`,
                }
            )

        message.channel.send(embed)
    },
};