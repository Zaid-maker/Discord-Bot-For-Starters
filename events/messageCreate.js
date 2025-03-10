const { Client, Message } = require("discord.js");
const config = require("../settings.json");
const simply = require("simply-djs");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @returns
   */
  run: async (client, message) => {
    //simply nqn(not quite nitro)
    simply.nqn(message);

    if (message.content === `<@!${client.user.id}>`)
      return message.channel.send({
        content: `My prefix is \`${config.prefix}\``,
      });
    if (
      message.author.bot ||
      !message.guild ||
      !message.content.startsWith(client.settings.prefix)
    )
      return;
    const args = message.content
      .slice(client.settings.prefix.length)
      .trim()
      .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    let command = client.prefix_commands.get(cmd);
    if (!command) command = client.prefix_commands.get(client.aliases.get(cmd));
    if (!command) return;

    if (command.botPermissions) {
      const Permissions = command.botPermissions
        .filter((x) => !message.guild.me.permissions.has(x))
        .map((x) => "`" + x + "`");
      if (Permissions.length)
        return message.channel.send(
          `I need ${Permissions.join(
            ", "
          )} permission(s) to execute the command!`
        );
    }

    if (command.memberPermissions) {
      const Permissions = command.memberPermissions
        .filter((x) => !message.member.permissions.has(x))
        .map((x) => "`" + x + "`");
      if (Permissions.length)
        return message.channel.send(
          `You need ${Permissions.join(
            ", "
          )} permission(s) to execute this command!`
        );
    }

    if (command.ownerOnly) {
      if (message.author.id !== client.settings.ownerId)
        return message.channel.send("This command can only be use by owner :C");
    }

    command.run(client, message, args);
  },
};
