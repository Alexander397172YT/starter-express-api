module.exports = {
    name: 'clear-queue',
    aliases: ['cq'],
    description: 'Очистить очередь',
    category: 'Музыка',
    utilisation: '{prefix}clear-queue',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Ты не в нужном голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Сейчас не играет музыка!`);

        if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(`${client.emotes.error} - В очереди только одна песня.`);

        client.player.clearQueue(message);

        message.channel.send(`${client.emotes.success} - Очередь была **Очищена** !`);
    },
};