// First party imports
import { Component } from '@angular/core';
// Local imports
import { HeaderComponent } from './components/header/header.component';
import { CatnavigationComponent } from './components/catnavigation/catnavigation.component';

@Component({
  selector: 'home',
  imports: [HeaderComponent, CatnavigationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
