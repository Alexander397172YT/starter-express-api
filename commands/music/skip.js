module.exports = {
    name: 'skip',
    aliases: ['sk'],
    description: 'Пропустить музыку',
    category: 'Музыка',
    utilisation: '{prefix}skip',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Ты не в нужном голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Сейчас не играет музыка!`);

        const success = client.player.skip(message);

        if (success) message.channel.send(`${client.emotes.success} - Текущая музыка **пропущена**!`);
    },
};