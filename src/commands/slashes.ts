import { Pagination } from "@discordx/pagination";
import { Inject, Injectable } from '@nestjs/common';
import type { CommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Discord, MetadataStorage, Slash } from "discordx";
import { Test } from '../test.js';
import { Test2 } from '../test2.js';

@Discord()
// @Injectable()
export class SlashExample {
  constructor(private readonly test: Test) {}
  
  // example: pagination for all slash command
  @Slash("all-commands", { description: "Pagination for all slash command" })
  async pages(interaction: CommandInteraction): Promise<void> {
    interaction.reply('qwe' + this.test.foo())
  }
}
