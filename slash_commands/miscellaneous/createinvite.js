const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Client, CommandInteraction } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createinvite")
    .setDescription("Creates an invite to this guild channel.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to generate the invite link to")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("temporary")
        .setDescription(
          "Should kick the member after the invite expires? reply with true or false."
        )
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for the invite.")
        .setRequired(false)
    )
    .addNumberOption((option) =>
      option
        .setName("maxage")
        .setDescription("Max age of the invite.")
        .setRequired(false)
    )
    .addNumberOption((option) =>
      option
        .setName("maxuses")
        .setDescription("Max uses of the invite. Default is 0.")
        .setRequired(false)
    ),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} Interaction
   */
  run: async (client, Interaction) => {
    const Temporary = Interaction.options.getBoolean("temporary");
    const Reason = Interaction.options.getString("reason");
    const MaxAge = Interaction.options.getNumber("maxage");
    const MaxUses = Interaction.options.getNumber("maxuses");
    const Channel = Interaction.options.getChannel("channel");

    Channel
      .createInvite({
        maxAge: MaxAge,
        maxUses: MaxUses,
        reason: Reason,
        temporary: Temporary
      })
      .then((invite) => {
        let embed = new MessageEmbed()
          .setAuthor({
            name: `${Interaction.user.username}`,
            iconURL: `${Interaction.user.avatarURL({ dynamic: true })}`,
          })
          .setColor("#0099ff")
          .setTitle("Generated Invite Link")
          .setDescription(`\`\`\`https://discord.gg/${invite.code}\`\`\``)
          .setThumbnail(Interaction.guild.iconURL({ dynamic: true }))
          // wrap the invite code in discord.gg domain
          .setURL(`https://discord.gg/${invite.code}`)
          .addFields(
            {
              name: "Temporary",
              value: `\`\`\`${Temporary || 'off'}\`\`\``,
              inline: true,
            },
            {
              name: "Max Age",
              value: `\`\`\`${MaxAge ? 'Yes' : 'Not Specified'}\`\`\``,
              inline: true,
            },
            {
              name: "Max Uses",
              value: `\`\`\`${MaxUses ? 'Yes' : 'Not Specified'}\`\`\``,
              inline: true,
            },
            {
              name: "Reason",
              value: `\`\`\`${Reason ? 'Yes' : 'Not Specified'}\`\`\``,
              inline: true,
            }
          )
          .setTimestamp()
          .setFooter({
            text: "Copy the link or what else you want to do with it.",
            iconURL: Interaction.user.avatarURL({ dynamic: true }),
          });
        Interaction.followUp({
          embeds: [embed],
          content: `Channel Invite Link for <#${Channel.id}>`,
        });
      })
      .catch(console.error);
  },
};
