module.exports = (client, message, query, tracks) => {
    message.channel.send(`${client.emotes.error} - Неверный ответ... Пожалуйста, пропиши команду снова!`);
};