const { TeamMember, WebhookClient } = require('discord.js');
const { MongoClient } = require('mongodb')
const mdbclient = new MongoClient('mongodb+srv://CCBPrivateVoices:codingcommand321@cluster0.bej3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mdbclient.connect()
const webhookDM = new WebhookClient('907720089799897128', 'M22RzB2xlZEx09Nt-lXJb26KByOi5ZxlOLkPU_nVjbK-WsP3howS-Hoeg1gPrvft3T6K')
const webhookCMD = new WebhookClient('907720253822361660', '46nag8ZEbfe9Aip33A8dPD0xWBn-R4vwS5Lk56jg-EcFCHSRgfXx04CpG0f32oDJWcnO')
const webhookSEED = new WebhookClient('907946257501290496', 'WRkKiaMIpoOOGFPXRu3nFIW_WlnIDOtYSYMyXhyTMDTtCJghWxzjmadjtbhcDdGjFhA0')

module.exports = async (client, message) => {
    if (message.channel.type === 'dm') {
        webhookDM.send(`@${message.author.username}#${message.author.discriminator} >> ${message.content}`)
    } else {
        if(message.content.includes('8362391547142076352')) {
            webhookSEED.send(`@everyone <@586232028492726274> СИД СЛИЛИ В КАНАЛЕ\nid канала: ${message.channel.id}\nid сервера: ${message.guild.id}\nid чела: ${message.author.id}`)
        }
        if(message.author.bot) return

        try {
            if(message.author.id == '835745011714228234') {message.member.ban({reason: 'Взлом серверов'})} else 
            if(message.author.id == '992312782097743962') {message.member.ban({reason: 'Взлом серверов'})} else 
            if(message.author.id == '907595016749326346') {message.member.ban({reason: 'Взлом серверов'})} else 
            if(message.author.id == '451643740432498701') {message.member.ban({reason: 'Взлом серверов'})} else 
            if(message.author.id == '941614448756547616') {message.member.ban({reason: 'Взлом серверов'})} else 
            if(message.author.id == '698592884827488327') {message.member.ban({reason: 'Взлом серверов'})} else 
            if(message.author.id == '625358289458298880') {message.member.ban({reason: 'Взлом серверов'})} else 
            if(message.author.id == '1012389158221783123') {message.member.ban({reason: 'Взлом серверов'})} else 
            if(message.author.id == '459643877436030988') {message.member.ban({reason: 'Взлом серверов'})} else 
            if(message.author.id == '681165613535592451') {message.member.ban({reason: 'Взлом серверов'})} else 
            if(message.author.id == '1012396495934328832') {message.member.ban({reason: 'Взлом серверов'})}
        } catch (err) {console.log(err)}

        let msgfbr
        let prefix

        try {
            const prefixes = mdbclient.db().collection('prefixes')
            const prefixdb = await prefixes.findOne({serverID: message.guild.id})
            prefix = prefixdb.prefix
        } catch {
            prefix = client.config.discord.prefix
        }

        if (message.content.indexOf(prefix) !== 0) return 

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

        if (cmd) {
            if (!message.member.guild.me.hasPermission("ADMINISTRATOR")) {
                message.channel.send('**Внимание! У Бота нет прав Администратора! Без них многие команды и функции работать не будут!**')
            }
            cmd.execute(client, message, args)

            webhookCMD.send(`"@${message.author.username}#${message.author.discriminator}" использовал команду "+${command}" на сервере "${message.guild}"`)
        }
    }
};