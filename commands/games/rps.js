module.exports = {
    name: 'rockpaperscissors',
    aliases: ["rps", "кмн", "кнб", "каменьножницыбумага"],
    description: 'Сыграть в камень-ножницы-бумага',
    category: 'Игры',
    utilisation: '{prefix}rps',

    async execute(client, message, args) {
        const { MessageEmbed } = require("discord.js");
        const rock = '🪨'
        const paper = '📄'
        const scissors = '✂️'
        
		let embed = new MessageEmbed()
		.setTitle("Камень Ножницы Бумага")
		.setDescription("Поставь реакцию, чтобы играть!")
		.setTimestamp()
		let msg = await message.channel.send(embed)
		await msg.react(rock)
		await msg.react(scissors)
		await msg.react(paper)

		const filter = (reaction, user) => {
            return [rock, scissors, paper].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = [rock, scissors, paper]
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, {max:1, time: 60000, error: ["time"]}).then(
        	async(collected) => {
        		const reaction = collected.first()
        		let result = new MessageEmbed()
        		.setTitle("Результат")
        		.addField("Твой выбор", `${reaction.emoji.name}`)
        		.addField("Мой выбор", `${me}`)
			await msg.edit(result)
        		if ((me === rock && reaction.emoji.name === scissors) || (me === paper && reaction.emoji.name === rock) || (me === scissors && reaction.emoji.name === paper)) {
                    message.reply("Ты проиграл!");
                } else if (me === reaction.emoji.name) {
                    return message.reply("Ничья!");
                } else {
                    return message.reply("Ты выиграл!");
                }
            
        })
    },
};