module.exports = {
    name: 'ban',
    aliases: ['бан'],
    description: 'Забанить пользователя',
    category: 'Модерация',
    utilisation: '{prefix}ban <пользователь> <причина>',

    execute(client, message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('Для использования данной команды тебе необходимы права на Бан участников!')

        const usertoban = message.mentions.members.first()
        const reason = args.slice(1).join(' ')

        if (!usertoban) return message.reply('Укажите пользователя, которого Вы собираетесь забанить!')
        if (!reason) return message.reply('Укажите причину бана!')

        const member = message.guild.members.resolve(usertoban)

        member.ban({reason: reason,}).then(() => {
        message.reply('Пользователь успешно забанен!')
        }).catch(error =>
          message.channel.send(`Не удалось забанить пользователя! Ошибка: ${error}`)
        );
    },
};