module.exports = {
    name: 'base64',
    aliases: [],
    description: 'Закодировать текст в base64',
    category: 'Веселье',
    utilisation: '{prefix}base64 <текст>',

    async execute(client, message, args) {
        const { base64encode, base64decode } = require('nodejs-base64')
        
        try {
            switch(args[0]) {
                case 'encode':
                    if (!args.slice(1).join(' ')) return message.reply('Ты должен написать, что я должен закодировать!');
                    const coded = base64encode(args.slice(1).join(' '))
                    if (coded.length > 2000) return message.reply('Слишком много символов!')
                    message.channel.send(coded);
                break;
                case 'decode':
                    if (!args.slice(1).join(' ')) return message.reply('Ты должен написать, что я должен декодировать!');
                    message.channel.send(base64decode(args.slice(1).join(' ')));
                break;
                default:
                    return message.reply('Ты должен выбрать "Encode" (закодировать) или "Decode" (декодировать)!');
                break;
            }
        } catch (err) {
            message.channel.send('Ошибка!\n' + err).catch();
        }
    },
};