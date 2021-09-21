import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentRoute: string;

  constructor(private router: Router) { 
    this.currentRoute = '/home';
  }

  ngOnInit(): void {

    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.currentRoute = e.url;
      }
    });
    
  }

}
