module.exports = {
    name: 'kick',
    aliases: ['кик'],
    description: 'Кикнуть пользователя',
    category: 'Модерация',
    utilisation: '{prefix}kick <пользователь>',

    execute(client, message, args) {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('Для использования данной команды тебе необходимы права на Кик участников!')

        const usertokick = message.mentions.members.first()

        if (!usertokick) return message.reply('Укажите пользователя, которого Вы собираетесь кикнуть!')

        usertokick.kick().catch(error =>
            message.channel.send(`Не удалось кикнуть пользователя! Ошибка: ${error}`)
        );
        message.reply('Пользователь успешно кикнут!')
    },
};