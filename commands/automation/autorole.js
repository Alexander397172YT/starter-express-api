const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()

module.exports = {
    name: 'autorole',
    aliases: ['автороль', 'ar'],
    description: 'Автоматическая выдача роли при заходе на сервер',
    category: 'Автоматизация',
    utilisation: '{prefix}ar',

    async execute(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Для использования данной команды тебе необходимы права Администратора!')
        let msgctrl
        let serverID

        const func = args[0]
        switch (func) {
            case 'create':
                msgctrl = await message.channel.send('🔄 - Создается автороль, пожалуйста, подождите...')
                const role = message.mentions.roles.first()
                
                if (!role) return msgctrl.edit('❌ - Ошибка! Укажите роль, которая должна выдаваться при заходе на сервер!')
                const roleID = role.id

                serverID = message.guild.id

                autoroles = mdbclient.db().collection('autoroles')
                autorole = await autoroles.findOne({serverID: serverID})
                if(autorole) return msgctrl.edit('❌ - Ошибка! На этом сервере уже есть автороль! Нельзя создавать больше!')

                autoroles.insertOne({
                    serverID: serverID,
                    roleID: roleID
                })

                msgctrl.edit('✅ - Автоматическая выдача роли при заходе на сервер создана!')
            break
            case 'remove':
                msgctrl = await message.channel.send('🔄 - Автороль удаляется, пожалуйста, подождите...')

                serverID = message.guild.id

                autoroles = mdbclient.db().collection('autoroles')
                autorole = await autoroles.findOne({serverID: serverID})
                if(!autorole) return msgctrl.edit('❌ - Ошибка! На этом сервере еще нет автороли!')

                autoroles.deleteOne({serverID: serverID})

                msgctrl.edit('✅ - Автоматическая выдача роли при заходе на сервер успешно удалена!')
            break
            default:
                try {
                    const prefixes = mdbclient.db().collection('prefixes')
                    const prefixdb = await prefixes.findOne({serverID: message.guild.id})
                    prefix = prefixdb.prefix
                } catch {
                    prefix = client.config.discord.prefix
                }
                message.channel.send(`Что нужно сделать?\n${prefix}ar create  -  Создать автоматическую выдачу роли при заходе на сервер\n${prefix}ar remove  -  Удалить автоматическую выдачу роли при заходе на сервер\n\nПеред созданием убедитесь, что Бот имеет права на управление ролью, которую Вам нужно выдавать!`)
            break
        }
    }
}