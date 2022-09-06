module.exports = {
    name: 'userinfo',
    aliases: ['user'],
    description: 'Информация о Пользователе',
    category: 'Статистики',
    utilisation: '{prefix}userinfo <пользователь>',

    async execute(client, message, args) {
        const { MessageEmbed } = require("discord.js");
        const moment = require("moment")

        
        let user;
        user = message.mentions.members.first() || message.member
    
    
        //OPTIONS FOR STATUS
    
        let stat = {
            online: "https://emoji.gg/assets/emoji/9166_online.png",
            idle: "https://emoji.gg/assets/emoji/3929_idle.png",
            dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
            offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
        }
        let stat2 = {
            online: "Онлайн",
            idle: "Не Активен",
            dnd: "Не Беспокоить",
            offline: "Офлайн"
        }

        let yesno = {
            true: 'Да',
            false: 'Нет'
        }
    
        //NOW BADGES
        let badges = await user.user.flags
        badges = await badges.toArray();
    
        let newbadges = [];
        badges.forEach(m => {
          newbadges.push(m.replace("_", " "))
        })
        
    
        let embed = new MessageEmbed()
        .setColor('BLUE')
          .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    
    
          //OTHER STUFF 
          embed.setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
    
          //CHECK IF USER HAVE NICKNAME
          if (user.nickname !== null) embed.addField("Никнейм", user.nickname)
          embed.addField("Присоединился к Серверу", moment(user.user.joinedAt).format("DD.MM.YYYY"))
            .addField("Зарегистрировался", moment(user.user.createdAt).format("DD.MM.YYYY"))
            .addField("Информация", `ID: \`${user.user.id}\`\nДискриминатор: ${user.user.discriminator}\nБот: ${yesno[user.user.bot]}\nУдаленный Пользователь: ${yesno[user.deleted]}\nТэг: @${user.user.tag}`)
            .setFooter(stat2[user.user.presence.status], stat[user.user.presence.status])
    
    
    
          return message.channel.send(embed).catch(err => {
            return message.channel.send("Ошибка : " + err)
          })
    },
};