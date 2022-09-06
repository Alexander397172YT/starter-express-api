const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()

module.exports = async (client, oldMember) => {
    const memcounts = mdbclient.db().collection('memcounts')
    const memcount = await memcounts.findOne({serverID: oldMember.guild.id})

    if (!memcount) return mdbclient.logout()

    client.guilds.fetch(memcount.serverID).then(guild => {
        client.channels.fetch(memcount.channelID).then(channel => {
            channel.setName(`${memcount.text} ${guild.memberCount}`)
        })
    })
    
    const byemsgs = mdbclient.db().collection('byemsgs')
    const byemsg = await byemsgs.findOne({serverID: oldMember.guild.id})

    if (byemsg) {
      client.guilds.fetch(byemsg.serverID).then(guild => {
          client.channels.fetch(byemsg.channelID).then(async channel => {
            try {
                const prefixes = mdbclient.db().collection('prefixes')
                const prefixdb = await prefixes.findOne({serverID: message.guild.id})
                prefix = prefixdb.prefix
            } catch {
                prefix = client.config.discord.prefix
            }
              channel.send(byemsg.text.replace('{prefix}', prefix).replace('{memcount}', guild.memberCount).replace('{chancount}', guild.channels.cache.size).replace('{member}', `<@${oldMember.id}>`))
          })
      })
    }

    const warns = mdbclient.db().collection('warns')
    const warn = await warns.findOne({serverID: oldMember.guild.id, userID: oldMember.id})
    if(warn) {
        warns.deleteOne({serverID: oldMember.guild.id, userID: oldMember.id})
    }
}