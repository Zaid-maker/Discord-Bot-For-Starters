const { Client, Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "lockdown",
  description: "Locks the channel down for a specified time.",
  usage: "lockdown",
  aliases: ["ld", "lock"],
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
        SEND_MESSAGES: false,
      })
      .then(() => {
        //sends a message to the channel
        let embed = new MessageEmbed()
          .setTitle("Lockdown")
          .setColor("#00ff00")
          .setDescription(`🔒 ${message.channel} has locked by ${message.author}`)
          .setTimestamp()
          .setFooter({
            text: "locked the channel",
            iconURL: client.user.avatarURL(),
          });
        message.channel.send({
          embeds: [embed],
        });
      });
  },
};
