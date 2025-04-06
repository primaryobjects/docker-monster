import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Monster } from '../monster';
import { MonsterService } from '../monster.service';
import { SessionService } from '../session.service';
import { PagingComponent } from './paging/paging.component';

@Component({
  selector: 'app-monster',
  imports: [CommonModule, PagingComponent],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent {
  index: number = 0;
  monsters?: Monster[];
  monsterService: MonsterService = inject(MonsterService);
  sessionService: SessionService = inject(SessionService);

  constructor() {
    this.init();
  }

  private save() {
    this.sessionService.set({ monsters: this.monsters, index: this.index });
  }

  async init() {
    const cache = this.sessionService.get();
    if (cache) {
      ({ monsters: this.monsters, index: this.index } = cache);
    }
    else {
      this.monsters = await this.monsterService.getMonsters();
      this.save();
    }
  }

  async generateMonster() {
    const monster: Monster = await this.monsterService.generateMonster();

    if (this.monsters && this.index < this.monsters.length - 1) {
      this.monsters?.splice(this.index, 0, monster);
    }
    else {
      this.monsters?.push(monster);
      this.index++;
    }

    this.save();
  }

  async saveMonster(monster: Monster) {
    try {
      this.monsters && await this.monsterService.saveMonster(monster);
    } catch (error) {
      console.error('Error saving monster: ', error);
    }
  }

  update(index: number) {
    this.index = index;
    this.save();
  }
}
