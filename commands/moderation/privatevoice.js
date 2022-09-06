const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()

module.exports = {
    name: 'privatevoice',
    aliases: ['pv'],
    description: 'Создать приватный Голосовой канал',
    category: 'Модерация',
    utilisation: '{prefix}cpv',

    async execute(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Для использования данной команды тебе необходимы права Администратора!')
        let msgctrl
        let serverID
        let voices
        let voice
        let category
        let categoryID
        let channel
        let channelID

        const func = args[0]
        switch (func) {
            case 'create':
                msgctrl = await message.channel.send('🔄 - Создается приватный Голосовой Канал, пожалуйста, подождите...')

                serverID = message.guild.id

                voices = mdbclient.db().collection('voices')
                voice = await voices.findOne({serverID: serverID})
                if(voice) return msgctrl.edit('❌ - Ошибка! На этом сервере уже есть Приватный Голосовой Канал! Нельзя создавать больше одного!')

                category = await message.guild.channels.create('ПРИВАТНЫЕ ГОЛОСОВЫЕ КАНАЛЫ', {type: 'category'})
                categoryID = category.id 
                channel = await message.guild.channels.create('[+]', {type: 'voice', parent: categoryID})
                channelID = channel.id

                voices.insertOne({
                    serverID: serverID,
                    categoryID: categoryID,
                    channelID: channelID
                })

                msgctrl.edit('✅ - Приватный канал успешно создан! Ты можешь изменять его название и права, но ни в коем случае не перемещай Голосовой Канал в другую категорию!')
                mdbclient.logout()
            break
            case 'remove':
                msgctrl = await message.channel.send('🔄 - Приватный Голосовой Канал удаляется, пожалуйста, подождите...')

                serverID = message.guild.id

                voices = mdbclient.db().collection('voices')
                voice = await voices.findOne({serverID: serverID})
                if(!voice) return msgctrl.edit('❌ - Ошибка! На этом сервере еще нет Приватного Голосового Канала!')

                voices.deleteOne({serverID: serverID})

                msgctrl.edit('✅ - Приватный канал успешно удален!')
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
                message.channel.send(`Что нужно сделать?\n${prefix}pv create  -  Создать приватный Голосовой Канал\n${prefix}pv remove  -  Удалить приватный Голосовой Канал`)
                mdbclient.logout()
            break
        }
    },
};