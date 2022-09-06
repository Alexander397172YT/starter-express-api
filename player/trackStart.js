module.exports = (client, message, track) => {
    message.channel.send(`${client.emotes.music} - Сейчас играет ${track.title} в канале ${message.member.voice.channel.name}...`);
};