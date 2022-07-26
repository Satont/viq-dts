import { Module } from "@nestjs/common";
import { SlashExample2 } from './commands/slashes2.js';
import { Test2 } from "./test2.js";
import { HttpModule} from '@nestjs/axios'
@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [Test2, SlashExample2]
})
export class ModuleTwoTest {
}
