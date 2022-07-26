import { HttpService } from '@nestjs/axios';
import type { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { Test2 } from "../test2.js";

@Discord()
// @Injectable()
export class SlashExample2 {
  constructor(private readonly test: Test2, private readonly httpService: HttpService) {
    console.log("qweqwe");
  }

  // example: pagination for all slash command
  @Slash("all-commands2", { description: "Pagination for all slash command" })
  async pages(interaction: CommandInteraction): Promise<void> {
    const q = await this.httpService.get('https://jsonplaceholder.typicode.com/todos/1').toPromise()
    interaction.reply("qwe" + this.test.foo() + q?.data.title);
  }
}

console.log("qweqwe");
