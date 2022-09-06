module.exports = {
    name: 'filter',
    aliases: [],
    description: 'Применить фильтр к музыке',
    category: 'Музыка',
    utilisation: '{prefix}filter [filter name]',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Ты не в голосовом канале!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Ты не в нужном голосовом канале!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Сейчас не играет музыка!`);

        if (!args[0]) return message.channel.send(`${client.emotes.error} - Введите фильтр!`);

        const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) return message.channel.send(`${client.emotes.error} - Фильтр не найден!`);

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;

        client.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) message.channel.send(`${client.emotes.music} - Пожалуйста, подождите, я накладываю фильтры...`);
        else message.channel.send(`${client.emotes.music} - Пожалуйста, подождите, я убираю фильтры...`);
    },
};