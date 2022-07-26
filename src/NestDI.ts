import { IDependencyRegistryEngine } from "@discordx/di/build/esm/logic/IDependencyRegistryEngine.js";
import { ModuleRef, NestFactory } from "@nestjs/core";
import { InstanceOf } from "@discordx/di/build/esm/index.js";
import { InjectionProxy } from "./InjectionProxy.js";
import { INestApplicationContext } from "@nestjs/common";

export class NestDI implements IDependencyRegistryEngine {
  #moduleRef: ModuleRef | undefined;
  modules: Set<any> = new Set();
  private app: INestApplicationContext | undefined;

  constructor(private readonly _injectionProxy: InjectionProxy) {

  }

  addService<T>(classType: T) {
    this.#moduleRef?.create(classType as any).then((i) => this.modules.add(i));
  }

  getAllServices(): Set<unknown> {
    return this.modules;
  }

  getService<T>(classType: T): InstanceOf<T> | null {
    if (!this.#moduleRef) {
      return null;
    }
    return this.#moduleRef.get(classType as any);
  }

  async copyToNest():Promise<INestApplicationContext>{
    const app = await import("./nest.modules.js");
    this.app = await NestFactory.createApplicationContext(app.AppModule);
    this.#moduleRef = this.app?.get(ModuleRef);
    const all = this._injectionProxy.getAllServices();
    for(const service of all){
      this.modules.add(service);
    }
    return this.app;
  }
}
