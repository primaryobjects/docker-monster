import { Component, inject } from '@angular/core';
import { Monster } from '../monster';
import { MonsterService } from '../monster.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-monster',
  imports: [],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent {
  monster?: Monster;
  monsterService: MonsterService = inject(MonsterService);
  sessionService: SessionService = inject(SessionService);

  constructor() {
    this.init();
  }

  async init() {
    const cachedMonster = this.sessionService.getMonster();
    if (cachedMonster) {
      this.monster = cachedMonster;
    }
    else {
      const monsters: Monster[] = await this.monsterService.getMonsters();
      if (monsters && monsters.length) {
        this.monster = monsters[monsters.length - 1];
        this.sessionService.setMonster(this.monster);
      }
    }
  }

  async generateMonster() {
    this.monster = await this.monsterService.generateMonster();
    this.sessionService.setMonster(this.monster);
  }

  async addMonster() {
    try {
      this.monster && await this.monsterService.saveMonster(this.monster);
    } catch (error) {
      console.error('Error saving monster: ', error);
    }
  }
}
