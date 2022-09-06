module.exports = {
    name: 'say',
    aliases: ['сказать'],
    description: 'Сказать что-то от лица Бота',
    category: 'Веселье',
    utilisation: '{prefix}say <сообщение>',

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send('Что я должен сказать?')
        if (message.content.includes("@everyone")  || message.content.includes("@here") || message.mentions.roles.first() || message.mentions.users.first()) return message.channel.send("Сообщение не должно содержать пинга!");
        message.channel.send(args.join(" ")).cleanContent;
    },
};