import { Injectable } from '@angular/core';
import { Monster } from './monster';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private monsterCache?: Monster;

  constructor() { }

  getMonster(): Monster | undefined {
    return this.monsterCache;
  }

  setMonster(monster: Monster): void {
    this.monsterCache = monster;
  }
}
