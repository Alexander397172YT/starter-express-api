module.exports = (client, message, query) => {
    message.channel.send(`${client.emotes.error} - Результатов не найдено: ${query} !`);
};