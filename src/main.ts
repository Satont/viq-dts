import "reflect-metadata";
import type { Interaction, Message } from "discord.js";
import { Client, DIService } from "discordx";
import { NestDI } from "./NestDI.js";

export const bot = new Client({
  botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
  intents: [],
  silent: false
});

bot.once("ready", async () => {
  await bot.guilds.fetch();
  await bot.initApplicationCommands();

  console.log("Bot started");
});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
  bot.executeCommand(message);
});

async function run() {
  const di = new NestDI();
  DIService.engine = di;
  const appModuleResolver = await di.init();
  await appModuleResolver.init();
  await bot.login("ODk0MzEzMzk1OTMzODM5Mzkw.GSVXCh.6tx6GvIuLRcNSffcpQWOK0piRqtzNoSfbp-5QI");
}

run();
