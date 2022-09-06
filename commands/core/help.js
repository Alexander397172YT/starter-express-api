module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Показать все команды',
    category: 'Главные',
    utilisation: '{prefix}help <command name>',

    async execute(client, message, args) {
        let prefix
        try {
            const prefixes = mdbclient.db().collection('prefixes')
            const prefixdb = await prefixes.findOne({serverID: message.guild.id})
            prefix = prefixdb.prefix
        } catch {
            prefix = client.config.discord.prefix
        }

        if (!args[0]) {
            const core = message.client.commands.filter(x => x.category == 'Главные').map((x) => '`' + x.name + '`').join(', ');
            const music = message.client.commands.filter(x => x.category == 'Музыка').map((x) => '`' + x.name + '`').join(', ');
            const moder = message.client.commands.filter(x => x.category == 'Модерация').map((x) => '`' + x.name + '`').join(', ');
            const automation = message.client.commands.filter(x => x.category == 'Автоматизация').map((x) => '`' + x.name + '`').join(', ');
            const fun = message.client.commands.filter(x => x.category == 'Веселье').map((x) => '`' + x.name + '`').join(', ');
            const stats = message.client.commands.filter(x => x.category == 'Статистики').map((x) => '`' + x.name + '`').join(', ');
            const games = message.client.commands.filter(x => x.category == 'Игры').map((x) => '`' + x.name + '`').join(', ');

            message.channel.send({
                embed: {
                    color: 'BLUE',
                    author: { name: 'Панель помощи' },
                    footer: { text: `Подробнее о каждой команде: ${prefix}help <команда>` },
                    fields: [
                        { name: 'Главные', value: core },
                        { name: 'Музыка', value: music },
                        { name: 'Модерация', value: moder },
                        { name: 'Автоматизация', value: automation },
                        { name: 'Веселье', value: fun },
                        { name: 'Статистики', value: stats },
                        { name: 'Игры', value: games },
                    ],
                    timestamp: new Date(),
                },
            });
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send(`${client.emotes.error} - Команда не найдена!`);

            message.channel.send({
                embed: {
                    color: 'BLUE',
                    author: { name: 'Панель помощи' },
                    footer: { text: `Подробнее о каждой команде: ${prefix}help <команда>` },
                    fields: [
                        { name: 'Название', value: command.name, inline: true },
                        { name: 'Категория', value: command.category, inline: true },
                        { name: 'Замены', value: command.aliases.length < 1 ? 'Нет' : command.aliases.join(', '), inline: true },
                        { name: 'Использование', value: command.utilisation.replace('{prefix}', prefix), inline: true },
                        { name: 'Описание команды', value: command.description, inline: true },
                    ],
                    timestamp: new Date(),
                }
            });
        };
    },
};