const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()

module.exports = {
    name: 'welcomemessage',
    aliases: ['welcome', 'wm', 'приветствие'],
    description: 'Приветственное сообщение для новых пользователей',
    category: 'Автоматизация',
    utilisation: '{prefix}wm',

    async execute(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Для использования данной команды тебе необходимы права Администратора!')
        let msgctrl
        let serverID
        let channel
        let channelID

        const func = args[0]
        switch (func) {
            case 'create':
                msgctrl = await message.channel.send('🔄 - Создается Приветственное сообщение, пожалуйста, подождите...')
                const txt = args.slice(1).join(' ')
                
                if (!txt) return msgctrl.edit('❌ - Ошибка! Введите текст, который будет отображаться при входе!')
                if (txt.length > 1000) return msgctrl.edit('❌ - Ошибка! Текст слишком длинный! Максимум 1000 символов!')

                serverID = message.guild.id

                welcomemsgs = mdbclient.db().collection('welcomemsgs')
                welcomemsg = await welcomemsgs.findOne({serverID: serverID})
                if(welcomemsg) return msgctrl.edit('❌ - Ошибка! На этом сервере уже есть Приветственные сообщения! Нельзя создавать больше!')

                channel = message.channel
                channelID = channel.id

                welcomemsgs.insertOne({
                    serverID: serverID,
                    channelID: channelID,
                    text: txt
                })

                msgctrl.edit('✅ - Приветственные сообщения успешно созданы!')
            break
            case 'remove':
                msgctrl = await message.channel.send('🔄 - Приветственные сообщения удаляются, пожалуйста, подождите...')

                serverID = message.guild.id

                welcomemsgs = mdbclient.db().collection('welcomemsgs')
                welcomemsg = await welcomemsgs.findOne({serverID: serverID})
                if(!welcomemsg) return msgctrl.edit('❌ - Ошибка! На этом сервере еще нет Приветственных сообщений!')

                welcomemsgs.deleteOne({serverID: serverID})

                msgctrl.edit('✅ - Приветственные сообщения успешно удалены!')
            break
            default:
                try {
                    const prefixes = mdbclient.db().collection('prefixes')
                    const prefixdb = await prefixes.findOne({serverID: message.guild.id})
                    prefix = prefixdb.prefix
                } catch {
                    prefix = client.config.discord.prefix
                }
                message.channel.send(`Что нужно сделать?\n${prefix}wm create  -  Создать Приветственные сообщения\n${prefix}wm remove  -  Удалить Приветственные сообщения\n\nСоздавать Приветственные сообщения нужно обязательно в том канале, в котором Вы хотите сделать Приветственные сообщения!\n\nВы можете добавлять в сообщение переменные:\n{prefix} - префикс Бота на сервере\n{memcount} - кол-во участников на сервере\n{chancount} - кол-во каналов на сервере\n{member} - пинг нового участника`)
            break
        }
    }
}