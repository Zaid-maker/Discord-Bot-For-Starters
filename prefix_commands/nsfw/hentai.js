const { Client, Message, MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: 'hentai',
    description: 'Show hentai pictures.',
    aliases: ['hentaipics'],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message  
     */
    run: async (client, message, args) => {
        //check if channel tyoe is nsfw
        if(!message.channel.nsfw) return message.channel.send('This channel is not nsfw.');
        
        const hentai = await superagent.get('https://nekos.life/api/v2/img/Random_hentai_gif');
        const embed = new MessageEmbed()
            .setTitle('Hentai')
            .setImage(hentai.body.url)
            .setColor('RANDOM');
        message.channel.send({ embeds: [embed] });
    }
}