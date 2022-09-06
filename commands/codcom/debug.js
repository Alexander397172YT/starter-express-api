module.exports = {
    name: 'debug',
    aliases: [],
    description: 'Команда для Разработчика',
    category: 'Infos',
    utilisation: '{prefix}debug',

    execute(client, message) {
        if (message.member.id === '586232028492726274') {
            message.channel.send(`${client.emotes.success} - ${client.user.username} подключен к **${client.voice.connections.size}** каналам!`);
        }
    },
};