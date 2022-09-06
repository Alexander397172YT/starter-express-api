const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()

module.exports = {
    name: 'warn',
    aliases: [],
    description: 'Выдать предупреждение',
    category: 'Модерация',
    utilisation: '{prefix}warn <Пользователь>',

    async execute(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Для использования данной команды тебе необходимы права Администратора!')

        const usertowarn = message.mentions.members.first()

        if (!usertowarn) return message.reply('Укажите пользователя, которому нужно выдать предупреждение!')
        if (usertowarn === message.member) return message.reply('Вы не можете дать предупреждение себе!')

        const user = message.guild.members.resolve(usertowarn)
        const userID = user.id

        const warns = mdbclient.db().collection('warns')
        const warn = await warns.findOne({userID: userID}, {serverID: message.guild.id})

        if(!warn) {
            warns.insertOne({
                serverID: message.guild.id,
                userID: userID,
                warns: 1
            })
            message.channel.send(`Пользователю ${usertowarn} выдано Первое Предупреждение!`)
        } else {
            if(warn.warns === 1) {
                warns.updateOne(
                    warn,
                    {
                        $set: {
                            warns: 2
                        }
                    }
                )
                message.channel.send(`Пользователю ${usertowarn} выдано Второе Предупреждение!`)
            } else {
                warns.deleteOne(warn)
                user.ban({reason: 'Достигнуто 3 Предупреждения'}).catch(error =>
                    message.channel.send(`Не удалось забанить пользователя! Ошибка: ${error}`)
                );
                message.channel.send(`Пользователь ${usertowarn} получил 3/3 Предупреждений и получает Бан на Сервере!`)
            }
        }
    }
};