import { Pagination } from "@discordx/pagination";
import { Inject, Injectable } from '@nestjs/common';
import type { CommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Discord, MetadataStorage, Slash } from "discordx";
import { Test2 } from '../test2.js';

@Discord()
// @Injectable()
export class SlashExample2 {
  constructor(private readonly test: Test2) {
    console.log('qweqwe')
  }
  
  // example: pagination for all slash command
  @Slash("all-commands2", { description: "Pagination for all slash command" })
  async pages(interaction: CommandInteraction): Promise<void> {
    interaction.reply('qwe' + this.test.foo())
  }
}
console.log('qweqwe')