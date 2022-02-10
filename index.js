// require topgg-autoposter module
const { AutoPoster } = require("topgg-autoposter");
//require discord.js
const { ShardingManager } = require("discord.js");
// require settings.json
const { token, topgg_token } = require("./settings.json");

const manager = new ShardingManager("./bot.js", {
  token: token,
  totalShards: "auto",
  shardArgs: ["--shard"],
  respawn: true,
});

// Spawn the manager
manager.spawn();

// shard create event
manager.on("shardCreate", async (shard) => {
  console.log(
    `[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${
      shard.id
    }`
  );
});

// topgg-autoposter
const poster = AutoPoster(topgg_token, manager);

poster.on("posted", (stats) => {
  console.log(
    `[${new Date().toString().split(" ", 5).join(" ")}] Posted ${stats.message}`
  );
});

poster.on("error", (err) => {
  console.log(
    `[${new Date().toString().split(" ", 5).join(" ")}] Error: ${err}`
  );
});
