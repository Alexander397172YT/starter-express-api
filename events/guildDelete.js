const { MessageEmbed, WebhookClient } = require("discord.js");
const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()
const webhookGuilds = new WebhookClient('907714364453322792', '8hIRuIpww0nRJLURL9hp_LFjyHLIszKP1cAWxpdQ55UizkVxov8SiaIpGD14JtQDsjnq')

module.exports = async (client, guild) => {
    if(guild.id === '901538946222293002') return
        const embed = new MessageEmbed()
            .setTitle(`Бот удален с сервера`)
            .setColor('RED')
            .setThumbnail(guild.iconURL)
            .addFields(
                {
                    name: 'Название',
                    value: guild.name,
                },
                {
                    name: 'ID',
                    value: guild.id,
                },
                {
                    name: 'Регион',
                    value: guild.region,
                },
                {
                    name: 'Количество Участников',
                    value: guild.memberCount,
                },
                {
                    name: 'Время Бездействия',
                    value: `${guild.afkTimeout / 60} минут`,
                }
            )

        webhookGuilds.send(embed)

    const voices = mdbclient.db().collection('voices')
    const voice = await voices.findOne({serverID: guild.id})

    if(voice) {
        voices.deleteOne({serverID:guild.id})
        mdbclient.logout()
    }

    const memcounts = mdbclient.db().collection('memcounts')
    const memcount = await memcounts.findOne({serverID: guild.id})

    if(memcount) {
        memcounts.deleteOne({serverID:guild.id})
        mdbclient.logout()
    }

    const chancounts = mdbclient.db().collection('chancounts')
    const chancount = await chancounts.findOne({serverID: guild.id})

    if(chancount) {
        chancounts.deleteOne({serverID:guild.id})
        mdbclient.logout()
    }

    const welcomemessages = mdbclient.db().collection('welcomemsgs')
    const welcomemessage = await welcomemessages.findOne({serverID: guild.id})
    if(welcomemessage) {
        welcomemessages.deleteOne({serverID: guild.id})
    }

    const byemsgs = mdbclient.db().collection('byemsgs')
    const byemsg = await byemsgs.findOne({serverID: guild.id})
    if(byemsg) {
        byemsgs.deleteOne({serverID: guild.id})
    }

    const prefixes = mdbclient.db().collection('prefixes')
    const prefix = await prefixes.findOne({serverID: guild.id})
    if(prefix) {
        prefixes.deleteOne({serverID: guild.id})
    }

    const warns = mdbclient.db().collection('warns')
    const warn = await warns.findOne({serverID: guild.id})
    if(warn) {
        warns.deleteMany({serverID: guild.id})
    }
}