const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @returns
   */
  run: async (client, message) => {
    if (
      message.content.includes(
        `<@${message.mentions.members.first()?.user.id}>`
      ) ||
      message.content.includes(
        `<@!${message.mentions.members.first()?.user.id}>`
      )
    ) {
      const chembed = new MessageEmbed()
        .setTitle("👻 Ghost Ping Detected ❗")
        .setDescription(
          `I Found that ${message.author} **(${
            message.author.tag
          })** just ghost pinged ${message.mentions.members.first()} **(${
            message.mentions.users.first().tag
          })**\n\nContent: **${message.content}**`
        )
        .setColor("PURPLE")
        .setFooter({ text: "PingPong Ghost Ping Detector" })
        .setTimestamp();

      message.channel.send({ embeds: [chembed] }).then(async (msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
    }
  },
};
