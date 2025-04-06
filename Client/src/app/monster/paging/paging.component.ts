import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Monster } from '../../monster';

@Component({
  selector: 'app-paging',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './paging.component.html',
  styleUrl: './paging.component.css'
})
export class PagingComponent {
  @Input() monsters?: Monster[];
  @Input() index: number = 0;

  @Output() onSave = new EventEmitter<Monster>();
  @Output() onGenerate = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<number>();

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  saveMonster(monster?: Monster) {
    monster && this.onSave.next(monster);
  }

  generateMonster() {
    this.onGenerate.next();
  }

  update() {
    this.onUpdate.next(this.index);
  }

  left() {
    this.index > 0 && this.index--;
    this.update();
  }

  right() {
    this.monsters && this.index < this.monsters.length - 1 && this.index++;
    this.update();
  }
}
