const { Client, Message, MessageEmbed } = require("discord.js");
const { prefix } = require("../../settings.json");

module.exports = {
  name: "setnickname",
  description: "Allows to set nickname of a user.",
  aliases: ["setnick", "nickname"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @returns
   */
  run: async (client, message, args) => {
    // check if the user has permission to use this command
    if (!message.member.permissions.has("MANAGE_NICKNAMES")) {
      let embed = new MessageEmbed()
        .setTitle("<:error:896718126991966269> Invalid permissions")
        .setColor("#ff0000")
        .setDescription(
          `You don't have the permission to use this command, required permission: \`MANAGE_NICKNAMES\``
        )
        .setTimestamp()
        .setFooter({
          text: `Access denied!`,
          iconURL: `${message.author.displayAvatarURL()}`,
        });
      return message.channel.send({ embeds: [embed] });
    }

    // check if the bot has permission to use this command
    if (!message.guild.me.permissions.has("MANAGE_NICKNAMES")) {
      let embed = new MessageEmbed()
        .setTitle("<:error:896718126991966269> Invalid permissions")
        .setColor("#ff0000")
        .setDescription(
          `I don't have the permission to use this command, required permission: \`MANAGE_NICKNAMES\``
        )
        .setTimestamp()
        .setFooter({
          text: `Access denied!`,
          iconURL: `${message.author.displayAvatarURL()}`,
        });
      return message.channel.send({ embeds: [embed] });
    }

    let embed1 = new MessageEmbed()
      .setTitle("<:error:896718126991966269> Invalid arguments")
      .setColor("#ff0000")
      .setDescription(
        `You didn't provide any arguments, please provide a user to set nickname for.\n\n**Usage:** \`${prefix}setnickname <user> <nickname>\``
      )
      .setTimestamp()
      .setFooter({
        text: `Enter user`,
        iconURL: `${message.author.displayAvatarURL()}`,
      });
    if (!args[0]) return message.channel.send({ embeds: [embed1] });

    //check if user is mentioned
    let member = message.mentions.users.first() || message.member;

    let embed = new MessageEmbed()
      .setTitle("<:error:896718126991966269> Invalid user")
      .setColor("#ff0000")
      .setDescription(
        "It doesn't seem to be a valid user, please mention a valid user."
      )
      .setTimestamp()
      .setFooter({
        text: `Invalid user provided`,
        iconURL: `${message.author.displayAvatarURL()}`,
      });
    if (!member) return message.channel.send({ embeds: [embed] });

    let errorembed = new MessageEmbed()
      .setTitle("<:error:896718126991966269> Mention a User")
      .setColor("#ff0000")
      .setDescription("You didn't mention a user, please mention a valid user.")
      .setTimestamp()
      .setFooter({
        text: `Enter user`,
        iconURL: `${message.author.displayAvatarURL()}`,
      });
    if (!args[1]) return message.channel.send({ embeds: [errorembed] });

    let nick = args.slice(1).join(" ");

    try {
        member.setNickname(nick);
        let embed = new MessageEmbed()
            .setTitle("<:success:896718126937492234> Success")
            .setColor("#00ff00")
            .setDescription(`Successfully set nickname of ${member} to ${nick}`)
            .setTimestamp()
            .setFooter({
                text: `Success!`,
                iconURL: `${message.author.displayAvatarURL()}`,
            });
        return message.channel.send({ embeds: [embed] });
    } catch (error) {
        let errembed = new MessageEmbed()
            .setTitle("<:error:896718126991966269> Missing Permissions")
            .setColor("#ff0000")
            .setDescription(`I don't have the permission to set nickname of ${member}`)
            .setTimestamp()
            .setFooter({
                text: `Error!`,
                iconURL: `${message.author.displayAvatarURL()}`,
            });
        return message.channel.send({ embeds: [errembed] });
    }
  },
};
