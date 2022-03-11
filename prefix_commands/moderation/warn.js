const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "warn",
  description: "Warns a user.",
  usage: "warn <user> <reason>",
  aliases: ["w"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @returns
   */
  run: async (client, message, args) => {
    //check if the member has the permission to warn
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      let embed = new MessageEmbed()
        .setTitle("Error")
        .setColor("#ff0000")
        .setDescription(`You do not have the permission to warn a user.`)
        .setTimestamp()
        .setFooter({
          text: "warn",
          iconURL: client.user.avatarURL(),
        });
      message.channel.send({
        embeds: [embed],
      });
    }

    // check if the bot has the permission to use the command
    if (!message.guild.me.permissions.has("ADMINISTRATOR")) {
      let embed = new MessageEmbed()
        .setTitle("Error")
        .setColor("#ff0000")
        .setDescription(`I do not have the permission to warn a user.`)
        .setTimestamp()
        .setFooter({
          text: "warn",
          iconURL: client.user.avatarURL(),
        });
      message.channel.send({
        embeds: [embed],
      });
    }

    const user = message.mentions.users.first();
    if (!user) {
      //embed
      let embed = new MessageEmbed()
        .setTitle("Mention a User")
        .setColor("#ff0000")
        .setDescription(`Please mention a user to warn.`)
        .setTimestamp()
        .setFooter({
          text: "cannot find the user",
          iconURL: client.user.avatarURL(),
        });
      message.channel.send({
        embeds: [embed],
      });
    }

    //check if the user is bot
    if (user.bot) {
      let embed = new MessageEmbed()
        .setTitle("Cannot warn bots")
        .setColor("#ff0000")
        .setDescription(`You cannot warn a bot.`)
        .setTimestamp()
        .setFooter({
          text: "cannot warn a bot",
          iconURL: client.user.avatarURL(),
        });
      message.channel.send({
        embeds: [embed],
      });
    }

    // check if the user trying to warn hime self
    if (user.id === message.author.id) {
      let embed = new MessageEmbed()
        .setTitle("Cannot warn yourself")
        .setColor("#ff0000")
        .setDescription(`You cannot warn yourself, DUMBO`)
        .setTimestamp()
        .setFooter({
          text: "cannot warn yourself",
          iconURL: client.user.avatarURL(),
        });
      message.channel.send({
        embeds: [embed],
      });
    }

    //check if the user trying to warn guild owner
    if (user.id === message.guild.ownerId) {
      let embed = new MessageEmbed()
        .setTitle("Cannot warn guild owner")
        .setColor("#ff0000")
        .setDescription("You jerk, how you can warn server owner -_-")
        .setTimestamp()
        .setFooter({
          text: "cannot warn guild owner",
          iconURL: client.user.avatarURL(),
        });
      message.channel.send({
        embeds: [embed],
      });
    }

    //reason
    const reason = args.slice(1).join(" ");

    // check if the reason is given or not
    if (!reason) {
      let embed = new MessageEmbed()
        .setTitle("No reason given")
        .setColor("#ff0000")
        .setDescription(`Please give a reason for the warning.`)
        .setTimestamp()
        .setFooter({
          text: "no reason given",
          iconURL: client.user.avatarURL(),
        });
      message.channel.send({
        embeds: [embed],
      });
    }

    try {
        let embed = new MessageEmbed()
        .setTitle("Warning")
        .setColor("#ff0000")
        .setDescription(`You have been warned by **${message.author.tag}** for **${reason}** in **${message.guild.name}**`)
        .setTimestamp()
        .setFooter({
            text: "warning",
            iconURL: client.user.avatarURL(),
        });
        user.send({
            embeds: [embed],
        })
        let embed1 = new MessageEmbed()
        .setTitle("Warning")
        .setColor("#ff0000")
        .setDescription(`You warned **${user.username}** for **${reason}**`)
        .setTimestamp()
        .setFooter({
            text: "warning",
            iconURL: client.user.avatarURL(),
        });
        await message.channel.send({
            embeds: [embed1],
        })
    } catch {

    }
  },
};
