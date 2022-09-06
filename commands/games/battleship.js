module.exports = {
    name: 'battleship',
    aliases: ['bs'],
    description: 'Сыграть в Морской Бой',
    category: 'Игры',
    utilisation: '{prefix}battleship <пользователь>',

    async execute(client, message, args) {
        const { DiscordBattleShip } = require("discord-battleship-rus");
        const BattleShip = new DiscordBattleShip({
        embedColor: "RED", /* Any Discord.js Color Resolvable will work. */
        prefix: "+", /* This is the prefix that will be used in the users DM's for commands. 
                      You can set this to any string. */
        })

        await BattleShip.createGame(message);
    },
};