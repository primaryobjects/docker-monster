import { Routes } from '@angular/router';

import { MonsterComponent } from './monster/monster.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: MonsterComponent, pathMatch: 'full' }, // Home page
  { path: 'about', component: AboutComponent }, // About page
];
