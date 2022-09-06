const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()

module.exports = async (client, newMember) => {
    try {
        if(newMember.id == '835745011714228234') {newMember.ban({reason: 'Взлом серверов'})} else 
        if(newMember.id == '992312782097743962') {newMember.ban({reason: 'Взлом серверов'})} else 
        if(newMember.id == '907595016749326346') {newMember.ban({reason: 'Взлом серверов'})} else 
        if(newMember.id == '451643740432498701') {newMember.ban({reason: 'Взлом серверов'})} else 
        if(newMember.id == '941614448756547616') {newMember.ban({reason: 'Взлом серверов'})} else 
        if(newMember.id == '698592884827488327') {newMember.ban({reason: 'Взлом серверов'})} else 
        if(newMember.id == '625358289458298880') {newMember.ban({reason: 'Взлом серверов'})} else 
        if(newMember.id == '1012389158221783123') {newMember.ban({reason: 'Взлом серверов'})} else 
        if(newMember.id == '459643877436030988') {newMember.ban({reason: 'Взлом серверов'})} else 
        if(newMember.id == '681165613535592451') {newMember.ban({reason: 'Взлом серверов'})} else 
        if(newMember.id == '1012396495934328832') {newMember.ban({reason: 'Взлом серверов'})}
    } catch (err) {console.log(err)}
    
    const memcounts = mdbclient.db().collection('memcounts')
    const memcount = await memcounts.findOne({serverID: newMember.guild.id})

    if (memcount) {
      client.guilds.fetch(memcount.serverID).then(guild => {
          client.channels.fetch(memcount.channelID).then(channel => {
              channel.setName(`${memcount.text} ${guild.memberCount}`)
          })
      })
    }

    const welcomemsgs = mdbclient.db().collection('welcomemsgs')
    const welcomemsg = await welcomemsgs.findOne({serverID: newMember.guild.id})

    if (welcomemsg) {
      client.guilds.fetch(welcomemsg.serverID).then(guild => {
          client.channels.fetch(welcomemsg.channelID).then(async channel => {
            try {
                const prefixes = mdbclient.db().collection('prefixes')
                const prefixdb = await prefixes.findOne({serverID: message.guild.id})
                prefix = prefixdb.prefix
            } catch {
                prefix = client.config.discord.prefix
            }
              channel.send(welcomemsg.text.replace('{prefix}', prefix).replace('{memcount}', guild.memberCount).replace('{chancount}', guild.channels.cache.size).replace('{member}', `<@${newMember.id}>`))
          })
      })
    }

    const autoroles = mdbclient.db().collection('autoroles')
    const autorole = await autoroles.findOne({serverID: newMember.guild.id})

    if (autorole) {
        newMember.roles.add(newMember.guild.roles.cache.find(role => role.id === autorole.roleID))
    }

}