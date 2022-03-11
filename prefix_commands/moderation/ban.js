const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Bans a user.",
    usage: "ban <user> <reason>",
    aliases: ["b"],
    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @returns
     */
    run: async (client, message, args) => {
        // check if the user has permission to use this command
        if (!message.member.permissions.has("BAN_MEMBERS")) {
            let embed = new MessageEmbed()
                .setTitle("Insufficient Permission")
                .setColor("#ff0000")
                .setDescription(`You do not have the permission to ban a user.`)
                .setTimestamp()
                .setFooter({
                    text: "permission error",
                    iconURL: client.user.avatarURL(),
                });
            message.channel.send({
                embeds: [embed],
            });
        }

        // check if the bot has the permission to use the command
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
            let embed = new MessageEmbed()
                .setTitle("Insufficient Permission")
                .setColor("#ff0000")
                .setDescription(`I do not have the permission to ban a user.`)
                .setTimestamp()
                .setFooter({
                    text: "permission error",
                    iconURL: client.user.avatarURL(),
                });
            message.channel.send({
                embeds: [embed],
            });
        }

        const reason = args.slice(1).join(" ");

        if (!args[0]) {
            let embed = new MessageEmbed()
                .setTitle("Mention Someone")
                .setColor("#ff0000")
                .setDescription(`Please mention someone to ban.`)
                .setTimestamp()
                .setFooter({
                    text: "cannot find the user",
                    iconURL: client.user.avatarURL(),
                });
            message.channel.send({
                embeds: [embed],
            });
        }
    }
}