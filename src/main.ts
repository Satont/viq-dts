import "reflect-metadata";

import type { Interaction, Message } from "discord.js";
import { IntentsBitField } from "discord.js";
import { DIService, Client } from "discordx";
import { ModuleRef, NestFactory } from '@nestjs/core';
import { AppModule } from './nest.modules.js';
import { IDependencyRegistryEngine } from '@discordx/di/build/esm/logic/IDependencyRegistryEngine'
import { InstanceOf } from '@discordx/di/build/esm';

const app = await NestFactory.createApplicationContext(AppModule);

class NestDI implements IDependencyRegistryEngine {
  #moduleRef: ModuleRef
  modules: Set<any> = new Set();

  constructor() {
    this.#moduleRef = app.get(ModuleRef)
  }

  addService<T>(classType: T) {
    console.log(classType)
    this.#moduleRef.create(classType as any).then((i) => this.modules.add(i))
    // this.modules.add(instance)
  }

  getAllServices(): Set<unknown> {
    return this.modules
  }

  getService<T>(classType: T): InstanceOf<T> | null {
    return this.#moduleRef.get(classType as any)
  }
}

const di = new NestDI()
DIService.engine = di

export const bot = new Client({
  botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent
  ],
  silent: true,
});

bot.once("ready", async () => {
  await bot.guilds.fetch();
  await bot.initApplicationCommands()

  console.log("Bot started");
});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
  bot.executeCommand(message);
});

async function run() {
  await app.init()
  await bot.login();
}

run();
