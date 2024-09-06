import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  tiles: any[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      console.log('getCurrentNavigation', this.router.getCurrentNavigation()?.extras.state);
    }
  }

  goToDashboard() {
    const extras: NavigationExtras = {
      state: {
        id: 1,
        name: 'eduardo',
        card: '1234123412341234',
        bestweb: true
      }
    }
    this.router.navigate(['dashboard'], extras)
  }

  goToDashboardParams() {
    this.router.navigate(['dashboard', '1'])
  }

}
