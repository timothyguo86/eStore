// First party imports
import { Component } from '@angular/core';
// Local imports
import { HeaderComponent } from './components/header/header.component';
import { CatNavigationComponent } from './components/catNavigation/catNavigation.component';

@Component({
  selector: 'home',
  imports: [HeaderComponent, CatNavigationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
