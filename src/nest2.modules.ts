import { Module } from '@nestjs/common';
import { AnotherClass } from './anotherCLass.js';
import { SlashExample } from './commands/slashes.js';
import { Test } from './test.js';
import { Test2 } from './test2.js';

@Module({
  imports: [],
  controllers: [],
  providers: [Test2],
})
export class ModuleTwoTest {}
