import { Discord } from "discordx";

@Discord()
// @Injectable()
export class Test2 {
  private i = 0;

  foo() {
    this.i++;
    return "clazz2 bar" + this.i;
  }
}
