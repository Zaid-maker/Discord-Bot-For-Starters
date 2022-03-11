const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "unlock",
  description: "Unlocks the channel.",
  usage: "unlock",
  aliases: ["ul", "unlock"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @returns
   */
  run: async (client, message, args) => {
    //overwrites the permissions of the channel
    message.channel.permissionOverwrites
      .create(message.guild.id, {
        SEND_MESSAGES: true,
      })
      .then(() => {
        //sends a message to the channel
        let embed = new MessageEmbed()
          .setTitle("Unlock")
          .setColor("#00ff00")
          .setDescription(
            `🔓 ${message.channel} has unlocked by ${message.author}`
          )
          .setTimestamp()
          .setFooter({
            text: "unlocked the channel",
            iconURL: client.user.avatarURL(),
          });
        message.channel.send({
          embeds: [embed],
        });
      });
  },
};
