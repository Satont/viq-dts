import { Injectable } from '@nestjs/common';
import { Discord } from 'discordx';

@Discord()
// @Injectable()
export class Test {
  private i = 0

  foo() {
    this.i++
    return 'bar' + this.i
  }
}