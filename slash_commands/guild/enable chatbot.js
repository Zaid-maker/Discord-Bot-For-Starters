const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const chatbot_settings = require("../../models/chatbotSetting");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("enable-chatbot")
    .setDescription("Enables the chatbot for this guild.")
    .addBooleanOption((option) =>
      option
        .setName("select")
        .setDescription("Choice whether to enable or disable the chatbot.")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Enable the chatbot in the given channel.")
        .setRequired(true)
    ),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const Channel = interaction.options.getChannel("channel");
    // check the boolean option to see if the chatbot should be enabled or disabled
    const Select = interaction.options.getBoolean("select");

    chatbot_settings.findOne({ Guild: interaction.guild.id }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        if (res) {
          if (Select) {
            res.ChatbotEnabled = true;
            res.ChatbotChannel = Channel.id;
            res.save();

            let embed = new MessageEmbed()
              .setTitle("Chatbot Enabled")
              .setColor("#00ff00")
              .setDescription(
                `The chatbot has been enabled in the channel ${Channel.name}.`
              )
              .setTimestamp()
              .setFooter({
                text: "Chatbot Successfully Enabled",
                iconURL: interaction.user.avatarURL({ dynamic: true }),
              });
            interaction.followUp({
              embeds: [embed],
            });
          } else {
            res.ChatbotEnabled = false;
            res.save();

            let embed1 = new MessageEmbed()
              .setTitle("Chatbot Disabled")
              .setColor("#ff0000")
              .setDescription(
                `The chatbot has been disabled in the channel ${Channel.name}.`
              )
              .setTimestamp()
              .setFooter({
                text: "Chatbot successfully Disabled.",
                iconURL: interaction.user.avatarURL({ dynamic: true }),
              });
            interaction.followUp({
              embeds: [embed1],
            });
          }
        }
      }
    });
  },
};
