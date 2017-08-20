import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { BlogComponent } from './blog/blog.component';

import { MdCardModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjetosComponent,
    BlogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MdCardModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    HomeComponent,
    ProjetosComponent,
    BlogComponent
  ]
})
export class AppModule { }
