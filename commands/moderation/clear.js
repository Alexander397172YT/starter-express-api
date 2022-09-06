module.exports = {
    name: 'clear',
    aliases: ['очистка'],
    description: 'Очистить сообщения',
    category: 'Модерация',
    utilisation: '{prefix}clear <количество>',

    execute(client, message, args) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Для использования данной команды тебе необходимы права для удаления сообщения!');
        /* Получаем кол-во сообщений к удалению, проверяем, что колд-во указанно корректно, если нет задаем кол-во равным 100 */
        let count = Number.parseInt(args[0]);
        if (!count || count > 100 || count <= 0) count = 100;
        message.channel
            .bulkDelete(count)
            .then(async () => {
                const msg = await message.channel.send(`Успешно удалено ${count} сообщений!`);
                let timerId = setTimeout(function () {
                    msg.delete()
                }, 3000);
            })
            .catch((err) => {
                message.channel.send(`Ошибка удаления сообщений! ${err}`);
            });
    },
};