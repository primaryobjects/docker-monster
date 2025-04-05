import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Monster } from './monster';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  readonly url: string = `${environment.apiUrl}/monster`;

  constructor() { }

  async getMonsters(): Promise<Monster[]> {
    const response = await fetch(this.url);
    const data = await response.json();
    return data;
  }

  async generateMonster(): Promise<Monster> {
    const response = await fetch(`${this.url}/new`);
    return await response.json();
  }

  async saveMonster(monster: Monster): Promise<Monster> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(monster)
    });

    if (!response.ok) {
      throw new Error(`Failed to save monster: ${response.statusText}`);
    }

    return await response.json();
  }
}