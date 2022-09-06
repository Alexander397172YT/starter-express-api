module.exports = {
    name: 'search',
    aliases: ['sr'],
    description: 'Искать на YouTube',
    category: 'Музыка',
    utilisation: '{prefix}search [name/URL]',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Ты не в нужном голосовом канале!`);

        if (!args[0]) return message.channel.send(`${client.emotes.error} - Введи название песни!`);

        client.player.play(message, args.join(" "));
    },
};