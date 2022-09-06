module.exports = {
    name: 'slots',
    aliases: ['слоты'],
    description: 'Сыграть в слоты',
    category: 'Игры',
    utilisation: '{prefix}slots',

    async execute(client, message, args) {
        const { MessageEmbed } = require("discord.js");
        const { SlotMachine, SlotSymbol } = require("slot-machine");

        const lemon = new SlotSymbol("lemon", { display: "🍋", points: 1, weight: 100 });
        const watermelon = new SlotSymbol("watermelon", { display: "🍉", points: 1, weight: 100 });
        const apple = new SlotSymbol("apple", { display: "🍎", points: 1, weight: 100 });
        const grape = new SlotSymbol("grape", { display: "🍇", points: 1, weight: 100 });
        const orange = new SlotSymbol("orange", { display: "🍊", points: 1, weight: 100 });
        const cherry = new SlotSymbol("cherry", { display: "🍒", points: 1, weight: 100 });
        const wild = new SlotSymbol("wild", { display: "❔", points: 1, weight: 40, wildcard: true });
        const bell = new SlotSymbol("bell", { display: "🔔", points: 2, weight: 40 });
        const clover = new SlotSymbol("clover", { display: "🍀", points: 3, weight: 35 });
        const heart = new SlotSymbol("heart", { display: "❤", points: 4, weight: 30 });
        const money = new SlotSymbol("money", { display: "💰", points: 5, weight: 25 });
        const diamond = new SlotSymbol("diamond", { display: "💎", points: 10, weight: 3 });
        const jackpot = new SlotSymbol("jackpot", { display: "🔅", points: 50, weight: 5});

        const machine = new SlotMachine(3, [cherry, lemon, watermelon, apple, grape, orange, wild, bell, clover, heart, money, diamond, jackpot]);


        
        const results = machine.play();
        const winnings = 10 * results.totalPoints;
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setAuthor("Слоты")
            .setDescription(`${results.visualize(false)}\n\n${results.winCount === 0 ? `${message.member.displayName} проиграл!\nПовезет в другой раз!` : `${message.member.displayName} выиграл!`}`)
            .setTimestamp();
        message.channel.send(embed);
    },
};

//выигрыш монет: ${results.winCount === 0 ? "" : `Ты выиграл ${winnings.toLocaleString()} монет!