// Third party import
import { Component } from '@angular/core';
// Local import
import { RatingsComponent } from '../ratings/ratings.component';

@Component({
  selector: 'product-details',
  imports: [RatingsComponent],
  templateUrl: './productDetails.component.html',
  styleUrl: './productDetails.component.scss',
})
export class ProductDetailsComponent {}
