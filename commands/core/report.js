const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()

module.exports = {
    name: 'report',
    aliases: ['rep', 'баг'],
    description: 'Сообщить разработчику Бота о баге/проблеме',
    category: 'Главные',
    utilisation: '{prefix}report <проблема>',

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send('Пожалуйста, укажите Вашу проблему!')
        reports = mdbclient.db().collection('reports')
        report = await reports.findOne({userID: message.member.id})
        
        if(!report) {
            reports.insertOne({
                userID: message.member.id,
                reports: 1
            })

            client.guilds.fetch('807551128043520022')
            .then(async guild => {
                const channel = await guild.channels.create(message.guild.id, {type: 'text', parent: '866722598083493888'})
                channel.send(`<@586232028492726274>!\nПользователь <@${message.member.id}> c Сервера под названием "${message.guild.name}" с ID "${message.guild.id}" отправил Репорт:`)
                channel.send(args.slice(0).join(' '))
                const Attachments = (message.attachments)
                if (Attachments) {
                    Attachments.forEach(attachment => {
                        channel.send(attachment.url)
                    });
                }
            })
    
            message.channel.send('Ваш репорт был отправлен разработчику, и при возможности Ваша проблема в скором времени будет исправлена. Спасибо за то что помогаете Боту!')
        } else {
            if(report.reports === 1) {
                reports.updateOne(
                    report,
                    {
                        $set: {
                            reports: 2
                        }
                    }
                )

                client.guilds.fetch('807551128043520022')
                .then(async guild => {
                    const channel = await guild.channels.create(message.guild.id, {type: 'text', parent: '866722598083493888'})
                    channel.send(`<@586232028492726274>!\nПользователь <@${message.member.id}> c Сервера под названием "${message.guild.name}" с ID "${message.guild.id}" отправил Репорт:`)
                    channel.send(args.slice(0).join(' '))
                    const Attachments = (message.attachments)
                    if (Attachments) {
                        Attachments.forEach(attachment => {
                            channel.send(attachment.url)
                        });
                    }
                })
        
                message.channel.send('Ваш репорт был отправлен разработчику, и при возможности Ваша проблема в скором времени будет исправлена. Спасибо за то что помогаете Боту!')
            } else if(report.reports === 2) {
                reports.updateOne(
                    report,
                    {
                        $set: {
                            reports: 3
                        }
                    }
                )

                client.guilds.fetch('807551128043520022')
                .then(async guild => {
                    const channel = await guild.channels.create(message.guild.id, {type: 'text', parent: '866722598083493888'})
                    channel.send(`<@586232028492726274>!\nПользователь <@${message.member.id}> c Сервера под названием "${message.guild.name}" с ID "${message.guild.id}" отправил Репорт:`)
                    channel.send(args.slice(0).join(' '))
                    const Attachments = (message.attachments)
                    if (Attachments) {
                        Attachments.forEach(attachment => {
                            channel.send(attachment.url)
                        });
                    }
                })
        
                message.channel.send('Ваш репорт был отправлен разработчику, и при возможности Ваша проблема в скором времени будет исправлена. Спасибо за то что помогаете Боту!')
            } else {
                message.channel.send('Ваш репорт не был отправлен, так как вы достигли максимального кол-ва репортов (3 шт). Дождитесь, пока уже отправленные репорты будут рассмотрены, и после этого повторите попытку.')
            }
        }
    },
};