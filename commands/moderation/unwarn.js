const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()

module.exports = {
    name: 'unwarn',
    aliases: [],
    description: 'Снять предупреждение',
    category: 'Модерация',
    utilisation: '{prefix}unwarn <Пользователь>',

    async execute(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Для использования данной команды тебе необходимы права Администратора!')

        const usertounwarn = message.mentions.members.first()

        if (!usertounwarn) return message.reply('Укажите пользователя, которому нужно снять предупреждение!')
        if (usertounwarn === message.member) return message.reply('Вы не можете снять предупреждение с себя!')

        const user = message.guild.members.resolve(usertounwarn)
        const userID = user.id

        const warns = mdbclient.db().collection('warns')
        const warn = await warns.findOne({userID: userID}, {serverID: message.guild.id})

        if(!warn) {
            message.channel.send('У этого пользователя нет предупреждений!')
        } else {
            if(warn.warns === 1) {
                warns.deleteOne(warn)
                message.channel.send(`Теперь у пользователя ${usertounwarn} нет предупреждений!`)
            } else {
                warns.updateOne(
                    warn,
                    {
                        $set: {
                            warns: 1
                        }
                    }
                )
                message.channel.send(`Теперь у пользователя ${usertounwarn} 1 предупреждение!`)
            }
        }
    }
};