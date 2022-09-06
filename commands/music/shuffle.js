module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    description: 'Перемешать очередь',
    category: 'Музыка',
    utilisation: '{prefix}shuffle',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Ты не в нужном голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Сейчас не играет музыка!`);

        const success = client.player.shuffle(message);

        if (success) message.channel.send(`${client.emotes.success} - Перемешано **${client.player.getQueue(message).tracks.length}** песен!`);
    },
};