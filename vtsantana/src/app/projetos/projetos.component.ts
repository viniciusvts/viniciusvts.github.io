import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {
  bio: object;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(
      '../assets/user.json'
    ).subscribe(
        data => {
          this.bio = data;
        }
      );
  }

}
