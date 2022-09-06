module.exports = {
    name: 'resume',
    aliases: [],
    description: 'Возобновить музыку, если она поставлена на паузу',
    category: 'Музыка',
    utilisation: '{prefix}resume',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Ты не в нужном голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Сейчас не играет музыка!`);

        if (!client.player.getQueue(message).paused) return message.channel.send(`${client.emotes.error} - Музыка уже играет!`);

        const success = client.player.resume(message);

        if (success) message.channel.send(`${client.emotes.success} - Песня ${client.player.getQueue(message).playing.title} возобновлена!`);
    },
};