module.exports = {
    name: 'avatar',
    aliases: ['аватар', 'ава', 'ava'],
    description: 'Аватарка пользователя',
    category: 'Статистики',
    utilisation: '{prefix}ava <пользователь>',

    async execute(client, message, args) {
        const { MessageEmbed } = require("discord.js")
        const user = message.mentions.users.first() || message.author;
        const avatarEmbed = new MessageEmbed()
            .setColor('BLUE')
            .setAuthor(user.username)
            .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`);
        message.channel.send(avatarEmbed);
    },
};