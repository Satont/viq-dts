import { Module } from "@nestjs/common";
import { Test2 } from "./test2.js";

@Module({
  imports: [],
  controllers: [],
  providers: [Test2]
})
export class ModuleTwoTest {
}
