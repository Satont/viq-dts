import { Module } from '@nestjs/common';
import { AnotherClass } from './anotherCLass.js';
import { SlashExample } from './commands/slashes.js';
import { ModuleTwoTest } from './nest2.modules.js';
import { Test } from './test.js';

@Module({
  imports: [],
  controllers: [],
  providers: [Test, SlashExample, AnotherClass],
})
export class AppModule {}