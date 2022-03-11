const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kicks a user.",
  usage: "kick <user> <reason>",
  aliases: ["k"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @returns
   */
  run: async (client, message, args) => {
    // check if the user has permission to use this command
    if (!message.member.permissions.has("KICK_MEMBERS")) {
      let embed = new MessageEmbed()
        .setTitle("Insufficient Permission")
        .setColor("#ff0000")
        .setDescription(`You do not have the permission to kick a user.`)
        .setTimestamp()
        .setFooter({
          text: "permission error",
          iconURL: client.user.avatarURL(),
        });
      message.channel.send({
        embeds: [embed],
      });
    }

    //check if the bot has the permission to use the command
    if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
      let embed = new MessageEmbed()
        .setTitle("Insufficient Permission")
        .setColor("#ff0000")
        .setDescription(`I do not have the permission to kick a user.`)
        .setTimestamp()
        .setFooter({
          text: "permission error",
          iconURL: client.user.avatarURL(),
        });
      message.channel.send({
        embeds: [embed],
      });
    }

    const member =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);

    const reason = args.slice(1).join(" ");

    if (!args[0]) {
      let embed = new MessageEmbed()
        .setTitle("Mention Someone")
        .setColor("#ff0000")
        .setDescription(`Please mention someone to kick.`)
        .setTimestamp()
        .setFooter({
          text: "cannot find the user",
          iconURL: client.user.avatarURL(),
        });
      return message.channel.send({
        embeds: [embed],
      });
    }

    //check if user is available
    if (!member) {
      let embed = new MessageEmbed()
        .setTitle("User Not Found")
        .setColor("#ff0000")
        .setDescription(`Could not find the user.`)
        .setTimestamp()
        .setFooter({
          text: "user not found",
          iconURL: client.user.avatarURL(),
        });
      return message.channel.send({
        embeds: [embed],
      });
    }

    // CHeck if user trying to kick himself
    if (member.id === message.author.id) {
      let embed = new MessageEmbed()
        .setTitle("Cannot Kick Yourself")
        .setColor("#ff0000")
        .setDescription(`You cannot kick yourself.`)
        .setTimestamp()
        .setFooter({
          text: "cannot kick yourself",
          iconURL: client.user.avatarURL(),
        });
      return message.channel.send({
        embeds: [embed],
      });
    }

    // check id user is trying to kick highest role or higher than him
    if (
      member.roles.highest.position >= message.member.roles.highest.position
    ) {
      let embed = new MessageEmbed()
        .setTitle("Cannot Kick")
        .setColor("#ff0000")
        .setDescription(
          "**You can't kick this member due to your role being lower than that member role.**"
        )
        .setTimestamp()
        .setFooter({
          text: "cannot kick",
          iconURL: client.user.avatarURL(),
        });
      return message.channel.send({
        embeds: [embed],
      });
    }

    //check if the user is kickable
    if (!member.kickable) {
      let embed = new MessageEmbed()
        .setTitle("Cannot Kick")
        .setColor("#ff0000")
        .setDescription(
          `
**Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
**Reason:** ${reason || "None"}
            `
        )
        .setTimestamp()
        .setFooter({
          text: "cannot kick",
          iconURL: client.user.avatarURL(),
        });
      message.channel.send({
        embeds: [embed],
      });

      await member.kick();
    } else {
      let embed = new MessageEmbed()
        .setTitle("Cannot Kick")
        .setColor("#ff0000")
        .setDescription(
          "Cannot kick this user because my role is lower than that user's role."
        )
        .setTimestamp()
        .setFooter({
          text: "cannot kick",
          iconURL: client.user.avatarURL(),
        });
      return message.channel.send({
        embeds: [embed],
      });
    }
    return undefined;
  },
};
