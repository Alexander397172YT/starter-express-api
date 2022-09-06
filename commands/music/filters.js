module.exports = {
    name: 'filters',
    aliases: [],
    description: 'Список всех фильтров',
    category: 'Музыка',
    utilisation: '{prefix}filters',

    async execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Ты не в нужном голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Сейчас не играет музыка!`);

        const filtersStatuses = [[], []];

        client.filters.forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " : " + (client.player.getQueue(message).filters[filterName] ? client.emotes.success : client.emotes.off));
        });
        try {
            const prefixes = mdbclient.db().collection('prefixes')
            const prefixdb = await prefixes.findOne({serverID: message.guild.id})
            prefix = prefixdb.prefix
        } catch {
            prefix = client.config.discord.prefix
        }

        message.channel.send({
            embed: {
                color: 'BLUE',
                footer: { text: 'Подробнее о каждой команде: +help <команда>' },
                fields: [
                    { name: 'Фильтры', value: filtersStatuses[0].join('\n'), inline: true },
                    { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
                ],
                timestamp: new Date(),
                description: `Полный список всех включенных и выключенных фильтров.\nИспользуй \`${prefix}filter\`, чтобы добавить фильтр к песне.`,
            },
        });
    },
};