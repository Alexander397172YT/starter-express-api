const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()

module.exports = {
    name: 'prefix',
    aliases: [],
    description: 'Изменить префикс Бота на сервере',
    category: 'Модерация',
    utilisation: '{prefix}prefix',

    async execute(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Для использования данной команды тебе необходимы права Администратора!')
        const ctrlmsg = await message.channel.send('🔄 - Префикс Бота на Сервере изменяется, пожалуйста, подождите...')

        const newprefix = args[0]

        if(!newprefix) return ctrlmsg.edit('❌ - Ошибка! Укажите новый префикс!')

        prefixes = mdbclient.db().collection('prefixes')
        prefix = await prefixes.findOne({serverID: message.guild.id})

        if(prefix) {
            prefixes.updateOne(
	            prefix,
	            {
		            $set: {
			            serverID: message.guild.id,
			            prefix: newprefix
		            }
	            }
            )
        } else {
            prefixes.insertOne({
                serverID: message.guild.id,
                prefix: newprefix
            })
        }

        ctrlmsg.edit('✅ - Префикс успешно изменен!')
    }
};