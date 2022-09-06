module.exports = {
    name: 'roleplay',
    aliases: ['rp'],
    description: 'Команды для Ролевой Игры',
    category: 'Веселье',
    utilisation: '{prefix}roleplay <действие> <пользователь>',

    async execute(client, message, args) {
        const fs = require('fs')
        try {
            const prefdb = fs.readFileSync('./json/prefixes/'+message.guild.id+'.json', 'utf8')
            const prefdb2 = JSON.parse(prefdb)
            prefix = prefdb2.prefix
        } catch {
            prefix = client.config.discord.prefix
        }
        const { MessageEmbed } = require("discord.js");
        let c, d
        let msgcmds = new MessageEmbed()
        .setAuthor(prefix+"rp <действие>\nСписок действий")
        .setColor("BLUE").addFields(
            {name: "__Колонна 1__", value: "**обнять\nубить\nударить**", inline: true},
            {name: "__Колонна 2__", value: "**пнуть\nсжечь\nпохвалить**", inline: true},
            {name: "__Колонна 3__", value: "**дать пять\nпожать руку\nпригласить на чай**", inline: true}
        )

        
        const a = args[0]
        c = args[1]
        d = args[2]
        const b = message.mentions.members.first()
        const nn = message.member

        switch (a) {
            case 'обнять':
                    if (!b)
                    return message.channel.send("Кого Вы хотите обнять?"); // If there is no opponent, require them to define one
                if (nn.id === b.id)
                    return message.channel.send("Вы не можете обнять себя! :("); // Check for prevention against challenging yourself
                const accept = await message.channel.send(`${b}, ${nn} хочет тебя обнять! Принять запрос?`); // Ask if the user would like to play 
                await Promise.all([accept.react("✅"), accept.react("❌")]);
                const acceptFilter = (reaction, user) => user.id === b.id && ["✅", "❌"].includes(reaction.emoji.name);
                const acceptedData = await accept.awaitReactions(acceptFilter, { max: 1, time: 30000 });
                if (acceptedData.size < 1)
                    return accept.edit(`${b} не ответил на твой запрос :(`);
                if (acceptedData.first().emoji.name === "❌")
                    return accept.edit(`К сожалению ${b} не принял твой запрос :(`);
                await accept.delete();
                message.channel.send(`${nn} обнял ${b}!`)
                
            break
            case 'убить':
                if (!b) return message.channel.send("Кого Вы хотите убить?")
                if (nn.id === b.id) return message.channel.send("Вы не можете убить себя!")
                message.channel.send(`${nn} убил ${b}!`)
                
            break
            case 'ударить':
                if (!b) return message.channel.send("Кого Вы хотите ударить?")
                if (nn.id === b.id) return message.channel.send("Вы не можете ударить себя!")
                message.channel.send(`${nn} ударил ${b}!`)
                
            break
            case 'пнуть':
                if (!b) return message.channel.send("Кого Вы хотите пнуть?")
                if (nn.id === b.id) return message.channel.send("Вы не можете пнуть себя!")
                message.channel.send(`${nn} пнул ${b}!`)
                
            break
            case 'сжечь':
                if (!b) return message.channel.send("Кого Вы хотите сжечь?")
                if (nn.id === b.id) return message.channel.send("Вы не можете сжечь себя!")
                message.channel.send(`${nn} сжёг ${b}!`)
                
            break
            case 'похвалить':
                if (!b) return message.channel.send("Кого Вы хотите похвалить?")
                if (nn.id === b.id) return message.channel.send("Вы не можете похвалить себя!")
                message.channel.send(`${nn} похвалил ${b}!`)
                
            break
            case 'дать':
                switch (c) {
                    case 'пять':
                        if (!b)
                            return message.channel.send("Кому Вы хотите дать пять?"); // If there is no opponent, require them to define one
                        if (nn.id === b.id)
                            return message.channel.send("Вы не можете дать пять себе!"); // Check for prevention against challenging yourself
                        const accept = await message.channel.send(`${b}, ${nn} хочет дать тебе пять! Принять запрос?`); // Ask if the user would like to play 
                        await Promise.all([accept.react("✅"), accept.react("❌")]);
                        const acceptFilter = (reaction, user) => user.id === b.id && ["✅", "❌"].includes(reaction.emoji.name);
                        const acceptedData = await accept.awaitReactions(acceptFilter, { max: 1, time: 30000 });
                        if (acceptedData.size < 1)
                            return accept.edit(`${b} не ответил на твой запрос!`);
                        if (acceptedData.first().emoji.name === "❌")
                            return accept.edit(`К сожалению ${b} не принял твой запрос!`);
                        await accept.delete();
                        message.channel.send(`${nn} дал пять ${b}!`)
                        
                    break
                    default:
                        message.channel.send(msgcmds)
                    break
                }
            break
            case 'пожать':
                switch (c) {
                    case 'руку':
                        if (!b)
                            return message.channel.send("Кому Вы хотите пожать руку?"); // If there is no opponent, require them to define one
                        if (nn.id === b.id)
                            return message.channel.send("Вы не можете пожать руку себе!"); // Check for prevention against challenging yourself
                        const accept = await message.channel.send(`${b}, ${nn} хочет пожать тебе руку! Принять запрос?`); // Ask if the user would like to play 
                        await Promise.all([accept.react("✅"), accept.react("❌")]);
                        const acceptFilter = (reaction, user) => user.id === b.id && ["✅", "❌"].includes(reaction.emoji.name);
                        const acceptedData = await accept.awaitReactions(acceptFilter, { max: 1, time: 30000 });
                        if (acceptedData.size < 1)
                            return accept.edit(`${b} не ответил на твой запрос!`);
                        if (acceptedData.first().emoji.name === "❌")
                            return accept.edit(`К сожалению ${b} не принял твой запрос!`);
                        await accept.delete();
                        message.channel.send(`${nn} пожал руку ${b}!`)
                        
                    break
                    default:
                        message.channel.send(msgcmds)
                    break
                }
            break
            case 'пригласить':
                switch (c) {
                    case 'на':
                        switch (d) {
                            case 'чай':
                                if (!b)
                                    return message.channel.send("Кого Вы хотите пригласить на чай?"); // If there is no opponent, require them to define one
                                if (nn.id === b.id)
                                    return message.channel.send("Вы не можете пригласить на чай себя!"); // Check for prevention against challenging yourself
                                const accept = await message.channel.send(`${b}, ${nn} хочет пригласить тебя на чай! Принять запрос?`); // Ask if the user would like to play 
                                await Promise.all([accept.react("✅"), accept.react("❌")]);
                                const acceptFilter = (reaction, user) => user.id === b.id && ["✅", "❌"].includes(reaction.emoji.name);
                                const acceptedData = await accept.awaitReactions(acceptFilter, { max: 1, time: 30000 });
                                if (acceptedData.size < 1)
                                    return accept.edit(`${b} не ответил на твой запрос!`);
                                if (acceptedData.first().emoji.name === "❌")
                                    return accept.edit(`К сожалению ${b} не принял твой запрос!`);
                                await accept.delete();
                                message.channel.send(`${nn} пригласил на чай ${b}!`)
                                
                            break
                            default:
                                message.channel.send(msgcmds)
                            break
                        }
                    break
                    default:
                        message.channel.send(msgcmds)
                    break
                }
            break
            default:
                message.channel.send(msgcmds)
            break

        }
    },
};