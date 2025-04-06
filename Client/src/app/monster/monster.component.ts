import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Monster } from '../monster';
import { MonsterService } from '../monster.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-monster',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent {
  index: number = 0;
  monsters?: Monster[];
  monsterService: MonsterService = inject(MonsterService);
  sessionService: SessionService = inject(SessionService);
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

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
    this.monsters?.splice(this.index, 0, await this.monsterService.generateMonster());
    this.monsters && this.sessionService.set({ monsters: this.monsters, index: this.index });
  }

  async saveMonster() {
    try {
      this.monsters && await this.monsterService.saveMonster(this.monsters[this.index]);
    } catch (error) {
      console.error('Error saving monster: ', error);
    }
  }

  left() {
    this.index > 0 && this.index--;
    this.save();
  }

  right() {
    this.monsters && this.index < this.monsters.length - 1 && this.index++;
    this.save();
  }
}
