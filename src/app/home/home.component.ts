import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  links;

  constructor(private appService: AppService) { }

  ngOnInit() {
		this.appService.getBio().then( results => this.links = results.social);
  }

}
