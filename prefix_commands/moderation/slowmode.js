const { MessageEmbed, Client, Message } = require("discord.js");

module.exports = {
  name: "slowmode",
  description: "Allows to set timeout in the channel.",
  aliases: ["setslow", "slow"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @returns
   */
  run: async (client, message, args) => {
    // Check if the user has the permission to use this command
    if (!message.member.permissions.has("MANAGE_CHANNELS")) {
      return message.channel.send(
        "You don't have the permission to use this command!"
      );
    }
    // check if the bot has the permission to use this command
    if (!message.guild.me.permissions.has("MANAGE_CHANNELS")) {
      return message.channel.send(
        "I don't have the permission to use this command!"
      );
    }

    const amount = parseInt(args[0]);

    let embed = new MessageEmbed()
      .setTitle("<:error:896718126991966269> Invalid number")
      .setColor("#ff0000")
      .setDescription(
        "It doesn't seem to be a valid number, please enter a valid number.\nNumber must be like 5s, 5min, 5h"
      )
      .setTimestamp()
      .setFooter({
        text: `Try again!`,
        iconURL: `${message.author.displayAvatarURL()}`,
      });
    if (isNaN(amount))
      return message.channel.send({
        embeds: [embed],
      });

    if (args[0] === amount + "s") {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        let embed = new MessageEmbed()
          .setTitle("<:success:896718126977001490> Success")
          .setColor("#00ff00")
          .setDescription(`Set slowmode to ${amount} seconds!`)
          .setTimestamp()
          .setFooter({
            text: `Success!`,
            iconURL: `${message.author.displayAvatarURL()}`,
          });
        message.channel.send({ embeds: [embed] });
        return;
      } else {
        let embed = new MessageEmbed()
          .setTitle("<:success:896718126977001490> Success")
          .setColor("#00ff00")
          .setDescription(`Set slowmode to ${amount} second!`)
          .setTimestamp()
          .setFooter({
            text: `Success!`,
            iconURL: `${message.author.displayAvatarURL()}`,
          });
        message.channel.send({ embeds: [embed] });
        return;
      }
    }

    if (args[0] === amount + "min") {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        let embed = new MessageEmbed()
          .setTitle("<:success:896718126977001490> Success")
          .setColor("#00ff00")
          .setDescription(`Set slowmode to ${amount} minutes!`)
          .setTimestamp()
          .setFooter({
            text: `Success!`,
            iconURL: `${message.author.displayAvatarURL()}`,
          });
        message.channel.send({ embeds: [embed] });
        return;
      } else {
        let embed = new MessageEmbed()
          .setTitle("<:success:896718126977001490> Success")
          .setColor("#00ff00")
          .setDescription(`Set slowmode to ${amount} minute!`)
          .setTimestamp()
          .setFooter({
            text: `Success!`,
            iconURL: `${message.author.displayAvatarURL()}`,
          });
        message.channel.send({ embeds: [embed] });
        return;
      }
    }

    if (args[0] === amount + "h") {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        let embed = new MessageEmbed()
          .setTitle("<:success:896718126977001490> Success")
          .setColor("#00ff00")
          .setDescription(`Set slowmode to ${amount} hours!`)
          .setTimestamp()
          .setFooter({
            text: `Success!`,
            iconURL: `${message.author.displayAvatarURL()}`,
          });
        message.channel.send({ embeds: [embed] });
        return;
      } else {
        let embed = new MessageEmbed()
          .setTitle("<:success:896718126977001490> Success")
          .setColor("#00ff00")
          .setDescription(`Set slowmode to ${amount} hour!`)
          .setTimestamp()
          .setFooter({
            text: `Success!`,
            iconURL: `${message.author.displayAvatarURL()}`,
          });
        message.channel.send({ embeds: [embed] });
        return;
      }
    } else {
      let embed = new MessageEmbed()
        .setTitle("<:error:896718126991966269> Wrong Format")
        .setColor("#ff0000")
        .setDescription(
          "You can only set time in seconds(s), minutes(min) and hours(h) format.\nExample: 5s, 5min, 5h"
        )
        .setTimestamp()
        .setFooter({
          text: `Try again!`,
          iconURL: `${message.author.displayAvatarURL()}`,
        });
      message.channel.send({ embeds: [embed] });
    }
  },
};
