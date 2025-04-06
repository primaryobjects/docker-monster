import { Injectable } from '@angular/core';
import { Monster } from './monster';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private cache?: any;

  constructor() { }

  get(): any {
    return this.cache;
  }

  set(obj: any): void {
    this.cache = obj;
  }
}
