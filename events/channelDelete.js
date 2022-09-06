const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()

module.exports = async (client, channel) => {
    const DelChannelID = channel.id
    
    const voices = mdbclient.db().collection('voices')
    const voicecat = await voices.findOne({categoryID: DelChannelID})
    const voicechan = await voices.findOne({channelID: DelChannelID})

    if(voicecat) {
        voices.deleteOne({categoryID: DelChannelID})
    } else if(voicechan) {
        voices.deleteOne({channelID: DelChannelID})
    }

    const memcounts = mdbclient.db().collection('memcounts')
    const memcount = await memcounts.findOne({channelID: DelChannelID})

    if(memcount) {
        memcounts.deleteOne({channelID: DelChannelID})
    }
    const chancounts = mdbclient.db().collection('chancounts')
    const chancount = await chancounts.findOne({serverID: channel.guild.id})
    if(chancount) {
        client.guilds.fetch(chancount.serverID).then(guild => {
            client.channels.fetch(chancount.channelID).then(channel => {
                channel.setName(`${chancount.text} ${guild.channels.cache.size}`)
            })
        })
    }
    
    const chancountdel = await chancounts.findOne({channelID: DelChannelID})
    if(chancountdel) {
        chancounts.deleteOne({channelID: DelChannelID})
    }

    const welcomemessages = mdbclient.db().collection('welcomemsgs')
    const welcomemessage = await welcomemessages.findOne({channelID: DelChannelID})
    if(welcomemessage) {
        welcomemessages.deleteOne({channelID: DelChannelID})
    }

    const byemsgs = mdbclient.db().collection('byemsgs')
    const byemsg = await byemsgs.findOne({channelID: DelChannelID})
    if(byemsg) {
        byemsgs.deleteOne({channelID: DelChannelID})
    }

    const logs = mdbclient.db().collection('logs')
    const log = await logs.findOne({channelID: DelChannelID})
    if(log) {
        logs.deleteOne({channelID: DelChannelID})
    }
}