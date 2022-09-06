module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    description: 'Информация о текущей песне',
    category: 'Музыка',
    utilisation: '{prefix}nowplaying',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Ты не в нужном голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Сейчас не играет музыка!`);

        const track = client.player.nowPlaying(message);
        const filters = [];

        Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        message.channel.send({
            embed: {
                color: 'BLUE',
                author: { name: track.title },
                footer: { text: 'Подробнее о каждой команде: +help <команда>' },
                fields: [
                    { name: 'Канал', value: track.author, inline: true },
                    { name: 'Запросил', value: track.requestedBy.username, inline: true },
                    { name: 'Из плейлиста', value: track.fromPlaylist ? 'Да' : 'Нет', inline: true },

                    { name: 'Просмотры', value: track.views, inline: true },
                    { name: 'Длительность', value: track.duration, inline: true },
                    { name: 'Активированные фильтры', value: filters.length + '/' + client.filters.length, inline: true },

                    { name: 'Громкость', value: client.player.getQueue(message).volume, inline: true },
                    { name: 'Повтор', value: client.player.getQueue(message).repeatMode ? 'Да' : 'Нет', inline: true },
                    { name: 'Пауза', value: client.player.getQueue(message).paused ? 'Да' : 'Нет', inline: true },

                    { name: 'Индикатор', value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
    },
};