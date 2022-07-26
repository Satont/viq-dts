import { IDependencyRegistryEngine } from "@discordx/di/build/esm/logic/IDependencyRegistryEngine.js";
import { ModuleRef, NestFactory } from "@nestjs/core";
import { InstanceOf } from "@discordx/di/build/esm/index.js";
import { INestApplicationContext } from "@nestjs/common";

export class NestDI implements IDependencyRegistryEngine {
  #moduleRef: ModuleRef | undefined
  modules: Set<any> = new Set();
  private app: INestApplicationContext | undefined;

  constructor() {
  }

  async init():Promise<INestApplicationContext>{
    const app = await import("./nest.modules.js");
    this.app = await NestFactory.createApplicationContext(app.AppModule);
    this.#moduleRef = this.app?.get(ModuleRef)
    return this.app;
  }

  async addService<T>(classType: T) {
    console.log(classType)
    const instance =  await this.#moduleRef?.create(classType as any);
    this.modules.add(instance)
  }

  getAllServices(): Set<unknown> {
    return this.modules
  }

  getService<T>(classType: T): InstanceOf<T> | null {
    if(!this.#moduleRef){
      return null;
    }
    return this.#moduleRef.get((classType as any).constructor);
  }
}
