const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()

module.exports = async (client, channel) => {
    /*const chancounts = mdbclient.db().collection('chancounts')
    const chancount = await chancounts.findOne({serverID: channel.guild.id})
    if(chancount) {
        client.guilds.fetch(chancount.serverID).then(guild => {
            client.channels.fetch(chancount.channelID).then(channel => {
                channel.setName(`${chancount.text} ${guild.channels.cache.size}`)
            })
        })
    }*/
}