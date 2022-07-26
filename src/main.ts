import "reflect-metadata";
import type { Interaction, Message } from "discord.js";
import { Client, DIService } from "discordx";
import { NestDI } from "./NestDI.js";
import { InjectionProxy } from "./InjectionProxy.js";

const injectionProxy = new InjectionProxy();
DIService.engine = injectionProxy;
const di = new NestDI(injectionProxy);

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
  const app = await di.copyToNest();
  DIService.engine = di;
  await app?.init();
  await bot.login("");
}

run();
