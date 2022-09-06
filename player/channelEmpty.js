module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.error} - Музыка остановлена, так как в канале никого нет!`);
};