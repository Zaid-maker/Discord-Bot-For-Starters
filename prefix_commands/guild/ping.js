const { MessageEmbed, Client, Message } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Get the websocket ping of the message.",
  aliases: ["botping"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @returns
   */
  run: async (client, message, args) => {
    let circles = {
      green: "<:online:903711513183940669>",
      yellow: "<:idle:903711513490112512> ",
      red: "<:dnd:903711513066487851>",
    };

    let botping = new MessageEmbed()
      .setTitle(`${client.user.username} Ping`)
      .setColor("2f3136")
      .addFields({
        name: "<:connection2:896715171454677013> Bot Ping:",
        value: `${
          client.ws?.ping <= 200
            ? circles.green
            : client.ws?.ping <= 400
            ? circles.yellow
            : circles.red
        } ${client.ws?.ping}ms`,
      })
      .setTimestamp()
      .setFooter({
        text: `${message.author.tag}`,
        iconURL: message.author.displayAvatarURL(),
      });
    return message.channel.send({ embeds: [botping] });
  },
};
