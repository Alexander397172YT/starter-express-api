module.exports = {
    name: 'ping',
    aliases: [],
    description: 'Узнать пинг Бота',
    category: 'Главные',
    utilisation: '{prefix}ping',

    execute(client, message) {
        message.channel.send(`${client.emotes.success} - Пинг: **${client.ws.ping}ms** !`);
    },
};