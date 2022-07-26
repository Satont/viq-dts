import { IDependencyRegistryEngine } from "@discordx/di/build/esm/logic/IDependencyRegistryEngine.js";
import { InstanceOf } from "@discordx/di";
import { DIService } from "discordx";

export class InjectionProxy implements IDependencyRegistryEngine {
  private _services = new Map();


  public getAllServices(): Set<unknown> {
    return new Set(this._services.values());
  }

  public addService<T>(classType: T): void {
    const clazz = classType as unknown as new () => InstanceOf<T>;
    const instance = new clazz();
    this.getService(DIService);
    this._services.set(clazz, instance);
  }

  public get services(): Map<any, any> {
    return this._services;
  }

  public getService<T>(classType: T): InstanceOf<T> {
    return this._services.get(classType);
  }
}
