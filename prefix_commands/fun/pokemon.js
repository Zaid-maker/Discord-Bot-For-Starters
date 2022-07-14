const { get } = require("request-promise-native");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "pokemon",
  description: "Let you search info about your favorite pokemon.",
  usage: ">pokenom <pokemon name>",
  aliases: ["poke"],
  run: async (client, message, args) => {
    const options = {
      url: `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=${args.join(
        " "
      )}`,
      json: true,
    };

    let embed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription("Hold on... Fetching information...")
      .setTimestamp();
    message.channel.send({ embeds: [embed] }).then((msg) => {
      get(options).then((body) => {
        let embed1 = new MessageEmbed()
          .setAuthor({
            name: body.name,
            iconURL: `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.typeIcon}`,
          })
          .setDescription(body.info.description)
          .setImage(
            `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.photo}`
          )
          .setColor("YELLOW")
          .setFooter({
            text: `Weakness of pokemon - ${body.info.weakness}`,
            iconURL: `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.weaknessIcon}`,
          });
        message.channel.send({ embeds: [embed1] });
        msg.delete();
      });
    });
  },
};
