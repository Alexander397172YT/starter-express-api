module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.error} - Музыка остановлена, так как очередь пустая!`);
};