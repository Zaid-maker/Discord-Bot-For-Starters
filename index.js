const { ShardingManager } = require("discord.js");
const { AutoPoster } = require("topgg-autoposter");
const { token, topgg_token } = require("./settings.json");

const manager = new ShardingManager("./bot.js", {
  token: token,
  totalShards: "auto",
});

manager.spawn({
  amount: "auto",
  delay: 5000,
  timeout: 30000,
});

manager.respawnAll({
  shardDelay: 5000,
  respawnDelay: 500,
  timeout: 30000,
});

manager.on("shardCreate", async (shard) => {
  shard.on("error", (error) => {
    console.log(
      `[${new Date().toString().split(" ", 5).join(" ")}] Shard #${
        shard.id
      } errored: ${error}`
    );
    shard.respawn();
  });

  shard.on("reconnection", () => {
    console.log(
      `[${new Date().toString().split(" ", 5).join(" ")}] Shard #${
        shard.id
      } reconnecting`
    );
  });

  shard.on("spawn", () => {
    console.log(
      `[${new Date()
        .toString()
        .split(" ", 5)
        .join(" ")}] Successfully Spawned Shard #${shard.id}`
    );
  });

  shard.on("death", () => {
    console.log(
      `[${new Date().toString().split(" ", 5).join(" ")}] Shard #${
        shard.id
      } died unexpectedly`
    );
  });
});

const poster = new AutoPoster(topgg_token, manager);

poster.on("posted", (stats) => {
  console.log(`Posted stats to Top.gg | ${stats.serverCount} servers`);
});
