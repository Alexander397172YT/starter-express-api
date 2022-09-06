module.exports = {
    name: 'news',
    aliases: [],
    description: 'Команда для Разработчика',
    category: 'Приват',
    utilisation: '{prefix}news <тип> <сообщение>',

    async execute(client, message, args) {
        if (!message.member.roles.cache.some(role => role.id === '800671548519874560')) return message.channel.send('Для использования данной команды тебе необходимы права Администратора!')
            const channame = args[0]
            const news = args.slice(1).join(' ')

            switch (channame) {
                case 'news':
                    client.channels.fetch('819547395908960296')
                    .then(channel => {
                        channel.send(news) //sending the arguments joined with a space in the fetched channel
                    })
                    .catch(console.error);
                break
                case 'bot':
                    client.channels.fetch('830709056997687367')
                    .then(async channel => {
                        channel.send(news)
                    })
                    .catch(console.error);
                break
                default:
                    message.channel.send('Неверный канал! Список каналов: news, bot')
                break
            } 
    },
};