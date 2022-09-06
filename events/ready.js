var os = require('os')
var osu = require('node-os-utils')
const { MessageEmbed, WebhookClient } = require("discord.js");
const webhookOn = new WebhookClient('907713516197281824', 'kQZ4hGq5S_2_CqK9KRXZe_k7rrybXvNwSJW7-0WcvyJMQ5kyeec7U72VTEnQ4cKaJ878')

module.exports = async (client) => {
    console.log(`[✅ Bot] ${client.user.tag} Online!`);
    client.channels.fetch('869926854021218304').then(channel => {
        channel.messages.fetch('869927005775351860').then(message => {
            setInterval(function () {
                osu.cpu.usage().then(cpu => {
                    usingmemb = os.totalmem() - os.freemem()
                    usingmemmb = (usingmemb/1048576).toFixed(3)
                
                    totalmemb = os.totalmem()
                    totalmemmb = (totalmemb/1048576).toFixed(0)

                    const embed = new MessageEmbed()
                    .setColor('RED')
                    .setAuthor("Статус работы CCBot")
                    .addFields(
                        {name: "Оперативная Память", value: `${usingmemmb}MB / ${totalmemmb}MB`, inline: true},
                        {name: "CPU", value: `${cpu}%`, inline: true},
                        {name: "Кол-во Каналов", value: client.voice.connections.size, inline: true},
                        {name: "Ping", value: `${client.ws.ping}ms`, inline: true},
                        {name: "Кол-во Серверов", value: client.guilds.cache.size, inline: true},
                        {name: "Всего участников", value: client.guilds.cache.reduce((a, g) => a + g.memberCount, 0), inline: true}
                    )
                    .setTimestamp();

                    message.edit(embed)
                })
            },60000)
        })
    })
    
    webhookOn.send('Бот Онлайн')

  var i = 0;
  setInterval(function () {    
      var gamePresence = [`на ${client.guilds.cache.size} серверов`, "https://bot.codingcommand.ga", "+help"];//каждое слово через запятую - отдельный статус
      client.user.setActivity(gamePresence[i%gamePresence.length], { type: 'WATCHING'}).catch(console.error)
      i++;
  },30000)
  
const pythonTeamEmoji = '<:python:800667130067812362>';
const phpTeamEmoji = '<:php:800668208755507231>';
const javascriptTeamEmoji = '<:javascript:800666845468164116>';
const javaTeamEmoji = '<:java:800669742981447692>';
const htmlTeamEmoji = '<:html:800668208872816650>';
const cssTeamEmoji = '<:css:800716381632856084>';
const CsharpTeamEmoji = '<:Csharp:800668209497243678>';
const CppTeamEmoji = '<:Cpp:800668207542698005>';

const pythonTeamEmojiId = '800667130067812362';
const phpTeamEmojiId = '800668208755507231';
const javascriptTeamEmojiId = '800666845468164116';
const javaTeamEmojiId = '800669742981447692';
const htmlTeamEmojiId = '800668208872816650';
const cssTeamEmojiId = '800716381632856084';
const CsharpTeamEmojiId = '800668209497243678';
const CppTeamEmojiId = '800668207542698005';

const chanlangreact = '820285220938973225'
const messagelang = '820285962079698965'
const chanrulesreact = '800675218447663114'
const messagerules = '829065551006400543'

const rusEmoji = '🇷🇺'
const engEmoji = '🇬🇧'


  
  client.channels.fetch(chanrulesreact)
      .then(channel => {
          channel.messages.fetch(messagerules).then(message => {
              message.react(rusEmoji);
              message.react(engEmoji);
              
              const RusTeamRole = message.guild.roles.cache.find(role => role.name === "Участник");
              const EngTeamRole = message.guild.roles.cache.find(role => role.name === "Member");

              client.on('messageReactionAdd', async (reaction, user) => {
                  if (reaction.message.partial) await reaction.message.fetch();
                  if (reaction.partial) await reaction.fetch();
                  if (user.bot) return;
                  if (!reaction.message.guild) return;
       
                  if (reaction.message.channel.id == channel) {
                      if (reaction.emoji.name === rusEmoji) {
                          await reaction.message.guild.members.cache.get(user.id).roles.add(RusTeamRole);
                      }
                      if (reaction.emoji.name === engEmoji) {
                          await reaction.message.guild.members.cache.get(user.id).roles.add(EngTeamRole);
                      }
                  } else {
                      return;
                  }
       
              });
       
              client.on('messageReactionRemove', async (reaction, user) => {
       
                  if (reaction.message.partial) await reaction.message.fetch();
                  if (reaction.partial) await reaction.fetch();
                  if (user.bot) return;
                  if (!reaction.message.guild) return;
       
       
                  if (reaction.message.channel.id == channel) {
                      if (reaction.emoji.name === rusEmoji) {
                          await reaction.message.guild.members.cache.get(user.id).roles.remove(RusTeamRole);
                      }
                      if (reaction.emoji.name === engEmoji) {
                          await reaction.message.guild.members.cache.get(user.id).roles.remove(EngTeamRole);
                      }
                  } else {
                      return;
                  }
              });
          })
      })




      
  client.channels.fetch(chanlangreact)
  .then(channel => {
      channel.messages.fetch(messagelang).then(message => {
          message.react(pythonTeamEmoji);
          message.react(phpTeamEmoji);
          message.react(javascriptTeamEmoji);
          message.react(javaTeamEmoji);
          message.react(htmlTeamEmoji);
          message.react(cssTeamEmoji);
          message.react(CsharpTeamEmoji);
          message.react(CppTeamEmoji);
          
          const pythonTeamRole = message.guild.roles.cache.find(role => role.name === "Python");
          const phpTeamRole = message.guild.roles.cache.find(role => role.name === "php");
          const javascriptTeamRole = message.guild.roles.cache.find(role => role.name === "JavaScript");
          const javaTeamRole = message.guild.roles.cache.find(role => role.name === "Java");
          const htmlTeamRole = message.guild.roles.cache.find(role => role.name === "html");
          const cssTeamRole = message.guild.roles.cache.find(role => role.name === "CSS");
          const CsharpTeamRole = message.guild.roles.cache.find(role => role.name === "C#");
          const CppTeamRole = message.guild.roles.cache.find(role => role.name === "C++");

          client.on('messageReactionAdd', async (reaction, user) => {
              if (reaction.message.partial) await reaction.message.fetch();
              if (reaction.partial) await reaction.fetch();
              if (user.bot) return;
              if (!reaction.message.guild) return;
   
              if (reaction.message.channel.id == channel) {
                  if (reaction.emoji.id === pythonTeamEmojiId) {
                      await reaction.message.guild.members.cache.get(user.id).roles.add(pythonTeamRole);
                  }
                  if (reaction.emoji.id === phpTeamEmojiId) {
                      await reaction.message.guild.members.cache.get(user.id).roles.add(phpTeamRole);
                  }
                  if (reaction.emoji.id === javascriptTeamEmojiId) {
                      await reaction.message.guild.members.cache.get(user.id).roles.add(javascriptTeamRole);
                  }
                  if (reaction.emoji.id === javaTeamEmojiId) {
                      await reaction.message.guild.members.cache.get(user.id).roles.add(javaTeamRole);
                  }
                  if (reaction.emoji.id === htmlTeamEmojiId) {
                      await reaction.message.guild.members.cache.get(user.id).roles.add(htmlTeamRole);
                  }
                  if (reaction.emoji.id === cssTeamEmojiId) {
                      await reaction.message.guild.members.cache.get(user.id).roles.add(cssTeamRole);
                  }
                  if (reaction.emoji.id === CsharpTeamEmojiId) {
                      await reaction.message.guild.members.cache.get(user.id).roles.add(CsharpTeamRole);
                  }
                  if (reaction.emoji.id === CppTeamEmojiId) {
                      await reaction.message.guild.members.cache.get(user.id).roles.add(CppTeamRole);
                  }
              } else {
                  return;
              }
   
          });
   
          client.on('messageReactionRemove', async (reaction, user) => {
   
              if (reaction.message.partial) await reaction.message.fetch();
              if (reaction.partial) await reaction.fetch();
              if (user.bot) return;
              if (!reaction.message.guild) return;
   
   
              if (reaction.message.channel.id == channel) {
                  if (reaction.emoji.id === pythonTeamEmojiId) {
                      await reaction.message.guild.members.cache.get(user.id).roles.remove(pythonTeamRole);
                  }
                  if (reaction.emoji.id === phpTeamEmojiId) {
                      await reaction.message.guild.members.cache.get(user.id).roles.remove(phpTeamRole);
                  }
                  if (reaction.emoji.id === javascriptTeamEmojiId) {
                      await reaction.message.guild.members.cache.get(user.id).roles.remove(javascriptTeamRole);
                  }
                  if (reaction.emoji.id === javaTeamEmojiId) {
                      await reaction.message.guild.members.cache.get(user.id).roles.remove(javaTeamRole);
                  }
                  if (reaction.emoji.id === htmlTeamEmojiId) {
                      await reaction.message.guild.members.cache.get(user.id).roles.remove(htmlTeamRole);
                  }
                  if (reaction.emoji.id === cssTeamEmojiId) {
                      await reaction.message.guild.members.cache.get(user.id).roles.remove(cssTeamRole);
                  }
                  if (reaction.emoji.id === CsharpTeamEmojiId) {
                      await reaction.message.guild.members.cache.get(user.id).roles.remove(CsharpTeamRole);
                  }
                  if (reaction.emoji.id === CppTeamEmojiId) {
                      await reaction.message.guild.members.cache.get(user.id).roles.remove(CppTeamRole);
                  }
              } else {
                  return;
              }
          });
      })
  })
};