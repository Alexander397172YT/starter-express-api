const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()

module.exports = {
    name: 'bot',
    aliases: [],
    description: 'Команда для Разработчика',
    category: 'Infos',
    utilisation: '{prefix}bot',

    async execute(client, message, args) {
        if (!message.member.id == '586232028492726274') return

        const func = args[0]

        switch (func) {
            case 'report':
                const reportwha = args[1]

                switch (reportwha) {
                    case 'deleteall':  
                        client.guilds.fetch('807551128043520022').then(async guild => {
                            const category = await guild.channels.cache.get('866722598083493888')
                            category.children.forEach(channel => channel.delete())
                        })
                    break
                }
            break
        }
    },
};