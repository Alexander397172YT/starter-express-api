module.exports = {
    name: 'random',
    aliases: [],
    description: 'Случайное число/предсказание',
    category: 'Веселье',
    utilisation: '{prefix}random <args>',

    async execute(client, message, args) {
        let me

        
        const type = args[0]

        switch (type) {
            case 'number':
            case 'число':
                me = Math.floor(Math.random() * 100)
                message.channel.send('Результат: ' + me)
            break
            default:
                const choices = ['Да', 'Нет', 'Возможно', 'Все зависит от тебя', 'Мало вероятно', 'Думаю, что да', 'Я так не думаю']
                me = choices[Math.floor(Math.random() * choices.length)]
                message.channel.send(me)
            break
        }
    },
};