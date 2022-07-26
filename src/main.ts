import "reflect-metadata";

import type { Interaction, Message } from "discord.js";
import { IntentsBitField } from "discord.js";
import { DIService, Client } from "discordx";
import { ModuleRef, NestFactory } from '@nestjs/core';
import { AppModule } from './nest.modules.js';
import { IDependencyRegistryEngine } from '@discordx/di/build/esm/logic/IDependencyRegistryEngine'
import { InstanceOf } from '@discordx/di/build/esm';
import { INestApplicationContext } from "@nestjs/common";

let app:INestApplicationContext | null= null;

class NestDI implements IDependencyRegistryEngine {
  #moduleRef: ModuleRef | undefined
  modules: Set<any> = new Set();

  constructor() {
    this.#moduleRef = app?.get(ModuleRef)
  }

  addService<T>(classType: T) {
    console.log(classType)
    this.#moduleRef?.create(classType as any).then((i) => this.modules.add(i))
    // this.modules.add(instance)
  }

  getAllServices(): Set<unknown> {
    return this.modules
  }

  getService<T>(classType: T): InstanceOf<T> | null {
    if(!this.#moduleRef){
      return null;
    }
    return this.#moduleRef.get(classType as any)
  }
}

const di = new NestDI()
DIService.engine = di
app = await NestFactory.createApplicationContext(AppModule);

export const bot = new Client({
  botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
  intents: [],
  silent: false,
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
  await app?.init()
  await bot.login("ODk0MzEzMzk1OTMzODM5Mzkw.GfWIGJ.aLmKBkcw9nZfoXmNr7gBiRc3kYSy3uHRCwV72Y");
}

run();
