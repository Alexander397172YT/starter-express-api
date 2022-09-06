msg = `Если ты хочешь поддержать Бота и его разработчика материально, то сделать это ты можешь по следующим ссылкам! (Советую использовать вторую, так как в ней нет комиссии).
1. DonationAlerts: <https://www.donationalerts.com/r/alexander39>
2. Qiwi: <https://qiwi.com/n/ALEXANDER39>
Огромное спасибо за Вашу поддержку!`

module.exports = {
    name: 'donate',
    aliases: ['донат', 'поддержать', 'пожертвование'],
    description: 'Поддержать CCBot\'а материально',
    category: 'Главные',
    utilisation: '{prefix}donate',

    execute(client, message) {
        message.channel.send(msg);
    },
};