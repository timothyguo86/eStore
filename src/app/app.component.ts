// Third party imports
import { Component } from '@angular/core';
// Local imports
import { HeaderComponent } from './header/header.component';
import { CatnavigationComponent } from './catnavigation/catnavigation.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, CatnavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
