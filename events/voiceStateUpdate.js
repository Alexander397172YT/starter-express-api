const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()

module.exports = async (client, oldMember, newMember) => {
    const memberChannelID = oldMember.channelID || newMember.channelID
    const memberCatagoryID = client.channels.cache.get(memberChannelID).parentID
    const user = await client.users.fetch(newMember.id)
    const member = newMember.guild.member(user)

    const voices = mdbclient.db().collection('voices')
    const voice = await voices.findOne({categoryID: memberCatagoryID})

    if(!voice) return mdbclient.logout()

    const mainChannel = voice.channelID
    const mainCatagory = voice.categoryID

    if(!mainCatagory === memberCatagoryID) return mdbclient.logout()

    if(!oldMember.channel && newMember.channel.id === mainChannel) {
        const { Permissions } = require('discord.js');
        const permissions = new Permissions(268550160);
        const channel = await newMember.guild.channels.create(user.tag, {
            type: "voice", 
            parent: newMember.channel.parent,
            permissionOverwrites: [
                {
                    id: user.id,
                    allow: ['PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'USE_VAD']
                }
            ]
        })
        member.voice.setChannel(channel)
    } else if(!newMember.channel) {
        if(oldMember.channel.members.size === 0) {
            if(oldMember.channel.id === mainChannel) return
            oldMember.channel.delete()
        }
    }
    mdbclient.logout()
}