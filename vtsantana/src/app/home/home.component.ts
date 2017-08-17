import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  links = {
    'linkedin' : 'https://www.linkedin.com/in/viniciusvts/',
    'github' : 'https://github.com/viniciusvts',
    'facebook' : 'https://www.facebook.com/viniciusvts',
    'email' : 'mailto:dev@vtsantana.com.br'
  };

  constructor() { }

  ngOnInit() {
  }

}
