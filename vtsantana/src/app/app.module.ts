import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdCardModule } from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { BlogComponent } from './blog/blog.component';


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
    MdButtonModule,
    BrowserModule,
    HttpClientModule
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
