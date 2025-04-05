import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonsterComponent } from './monster/monster.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MonsterComponent
  ],
  providers: [],
})
export class AppModule { }