module.exports = (client, message, query, tracks, content, collector) => {
    if (content === 'cancel') {
        collector.stop();
        return message.channel.send(`${client.emotes.success} - Выбор **отменен**!`);
    } else message.channel.send(`${client.emotes.error} - Ты должен указать верное число: от **1** до **${tracks.length}**!`);
};