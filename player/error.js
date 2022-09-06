module.exports = (client, error, message, ...args) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`${client.emotes.error} - На этом сервере не играла музыка!`);
            break;
        case 'NotConnected':
            message.channel.send(`${client.emotes.error} - Ты не в голосовом канале!`);
            break;
        case 'UnableToJoin':
            message.channel.send(`${client.emotes.error} - Я не могу присоединиться к каналу, проверьте мои права!`);
            break;
        case 'VideoUnavailable':
            message.channel.send(`${client.emotes.error} - ${args[0].title} недоступно в твоей стране! Пропуск...`);
            break;
        case 'MusicStarting':
            message.channel.send(`Музыка стартует... Пожалуйста, подождите и попробуйте еще раз!`);
            break;
        default:
            message.channel.send(`${client.emotes.error} - Что-то пошло не так... Ошибка: ${error}`);
    };
};
