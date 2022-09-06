const { MongoClient } = require('mongodb')
mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()

module.exports = {
    name: 'channelcount',
    aliases: ['cc'],
    description: 'Создать канал-счетчик каналов на Сервере',
    category: 'Модерация',
    utilisation: '{prefix}cc',

    async execute(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Для использования данной команды тебе необходимы права Администратора!')
        const { MongoClient } = require('mongodb')
        let msgctrl
        let serverID
        let chancounts
        let chancount
        let channel
        let channelID
        let mdbclient

        const func = args[0]
        switch (func) {
            case 'create':
                msgctrl = await message.channel.send('🔄 - Создается Счетчик Каналов, пожалуйста, подождите...')

                const txt = args.slice(1).join(' ')

                if (!txt) return msgctrl.edit('❌ - Ошибка! Введите текст, который будет отображаться перед числом!')
                if (txt.length > 90) return msgctrl.edit('❌ - Ошибка! Текст слишком длинный! Максимум 90 символов!')

                serverID = message.guild.id

                chancounts = mdbclient.db().collection('chancounts')
                chancount = await chancounts.findOne({serverID: serverID})
                if(chancount) return msgctrl.edit('❌ - Ошибка! На этом сервере уже есть счетчик каналов! Нельзя создавать больше одного!')

                channel = await message.guild.channels.create(`${txt} ${message.guild.channels.cache.size}`, {type: 'voice', permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone.id,
                        allow: ['VIEW_CHANNEL'],
                        deny: ['CONNECT']
                    }
                ]})
                channelID = channel.id

                chancounts.insertOne({
                    serverID: serverID,
                    channelID: channelID,
                    text: txt
                })

                msgctrl.edit('✅ - Счетчик Участников успешно создан!')
                mdbclient.logout()
            break
            case 'remove':
                msgctrl = await message.channel.send('🔄 - Счетчик каналов удаляется, пожалуйста, подождите...')

                mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
                await mdbclient.connect()

                serverID = message.guild.id

                chancounts = mdbclient.db().collection('chancounts')
                chancount = await chancounts.findOne({serverID: serverID})
                if(!chancount) return msgctrl.edit('❌ - Ошибка! На этом сервере еще нет Счетчика каналов!')

                chancounts.deleteOne({serverID: serverID})

                msgctrl.edit('✅ - Счетчик каналов успешно удален!')
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
                message.channel.send(`Что нужно сделать?\n${prefix}cc create  -  Создать Счетчик Каналов\n${prefix}cc remove  -  Удалить Счетчик Каналов`)
            break
        }
    },
};