import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {
  bio;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getBio().then( results => this.bio = results);
  }

}
