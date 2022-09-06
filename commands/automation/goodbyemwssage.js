const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()

module.exports = {
    name: 'goodbyemessage',
    aliases: ['goodbye', 'gm', 'прощание'],
    description: 'Прощальное сообщение для уходящих пользователей',
    category: 'Автоматизация',
    utilisation: '{prefix}gm',

    async execute(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Для использования данной команды тебе необходимы права Администратора!')
        let msgctrl
        let serverID
        let channel
        let channelID

        const func = args[0]
        switch (func) {
            case 'create':
                msgctrl = await message.channel.send('🔄 - Создается прощальное сообщение, пожалуйста, подождите...')
                const txt = args.slice(1).join(' ')
                
                if (!txt) return msgctrl.edit('❌ - Ошибка! Введите текст, который будет отображаться при уходе!')
                if (txt.length > 1000) return msgctrl.edit('❌ - Ошибка! Текст слишком длинный! Максимум 1000 символов!')

                serverID = message.guild.id

                byemsgs = mdbclient.db().collection('byemsgs')
                byemsg = await byemsgs.findOne({serverID: serverID})
                if(byemsg) return msgctrl.edit('❌ - Ошибка! На этом сервере уже есть прощальные сообщения! Нельзя создавать больше!')

                channel = message.channel
                channelID = channel.id

                byemsgs.insertOne({
                    serverID: serverID,
                    channelID: channelID,
                    text: txt
                })

                msgctrl.edit('✅ - Прощальные сообщения успешно созданы!')
            break
            case 'remove':
                msgctrl = await message.channel.send('🔄 - Прощальные сообщения удаляются, пожалуйста, подождите...')

                serverID = message.guild.id

                byemsgs = mdbclient.db().collection('byemsgs')
                byemsg = await byemsgs.findOne({serverID: serverID})
                if(!byemsg) return msgctrl.edit('❌ - Ошибка! На этом сервере еще нет прощальных сообщений!')

                byemsgs.deleteOne({serverID: serverID})

                msgctrl.edit('✅ - Прощальные сообщения успешно удалены!')
            break
            default:
                try {
                    const prefixes = mdbclient.db().collection('prefixes')
                    const prefixdb = await prefixes.findOne({serverID: message.guild.id})
                    prefix = prefixdb.prefix
                } catch {
                    prefix = client.config.discord.prefix
                }
                message.channel.send(`Что нужно сделать?\n${prefix}gm create  -  Создать прощальные сообщения\n${prefix}gm remove  -  Удалить прощальные сообщения\n\nСоздавать прощальные сообщения нужно обязательно в том канале, в котором Вы хотите сделать прощальные сообщения!\n\nВы можете добавлять в сообщение переменные:\n{prefix} - префикс Бота на сервере\n{memcount} - кол-во участников на сервере\n{chancount} - кол-во каналов на сервере\n{member} - пинг уходящего участника участника`)
            break
        }
    }
}