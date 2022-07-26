import { Discord } from "discordx";
import { SlashExample } from "./commands/slashes.js";

@Discord()
export class AnotherClass {
  constructor(private readonly slash: SlashExample) {
  }
}
