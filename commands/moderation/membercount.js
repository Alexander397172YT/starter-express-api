const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()

module.exports = {
    name: 'membercount',
    aliases: ['mc'],
    description: 'Создать канал-счетчик участников на Сервере',
    category: 'Модерация',
    utilisation: '{prefix}mc',

    async execute(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Для использования данной команды тебе необходимы права Администратора!')
        let msgctrl
        let serverID
        let memcounts
        let memcount
        let channel
        let channelID

        const func = args[0]
        switch (func) {
            case 'create':
                msgctrl = await message.channel.send('🔄 - Создается Счетчик Учатсников, пожалуйста, подождите...')

                const txt = args.slice(1).join(' ')

                if (!txt) return msgctrl.edit('❌ - Ошибка! Введите текст, который будет отображаться перед числом!')
                if (txt.length > 90) return msgctrl.edit('❌ - Ошибка! Текст слишком длинный! Максимум 90 символов!')

                serverID = message.guild.id

                memcounts = mdbclient.db().collection('memcounts')
                memcount = await memcounts.findOne({serverID: serverID})
                if(memcount) return msgctrl.edit('❌ - Ошибка! На этом сервере уже есть счетчик участников! Нельзя создавать больше одного!')

                channel = await message.guild.channels.create(`${txt} ${message.guild.memberCount}`, {type: 'voice', permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone.id,
                        allow: ['VIEW_CHANNEL'],
                        deny: ['CONNECT']
                    }
                ]})
                channelID = channel.id

                memcounts.insertOne({
                    serverID: serverID,
                    channelID: channelID,
                    text: txt
                })

                msgctrl.edit('✅ - Счетчик Участников успешно создан!')
                mdbclient.logout()
            break
            case 'remove':
                msgctrl = await message.channel.send('🔄 - Счетчик Участников удаляется, пожалуйста, подождите...')

                serverID = message.guild.id

                memcounts = mdbclient.db().collection('memcounts')
                memcount = await memcounts.findOne({serverID: serverID})
                if(!memcount) return msgctrl.edit('❌ - Ошибка! На этом сервере еще нет Счетчика Участников!')

                memcounts.deleteOne({serverID: serverID})

                msgctrl.edit('✅ - Счетчик Участников успешно удален!')
                mdbclient.logout()
            break
            default:
                try {
                    const prefixes = mdbclient.db().collection('prefixes')
                    const prefixdb = await prefixes.findOne({serverID: message.guild.id})
                    prefix = prefixdb.prefix
                } catch {
                    prefix = client.config.discord.prefix
                }
                message.channel.send(`Что нужно сделать?\n${prefix}mc create  -  Создать Счетчик Участников\n${prefix}mc remove  -  Удалить Счетчик Участников`)
            break
        }
    },
};