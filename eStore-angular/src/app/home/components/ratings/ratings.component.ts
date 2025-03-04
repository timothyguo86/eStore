// Third party import
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import {
  IconDefinition,
  faStar,
  faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ratings',
  imports: [FontAwesomeModule],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.scss',
})
export class RatingsComponent {
  @Input({ required: true }) set score(val: number) {
    this.stars = [];

    if (val < 0) {
      this._score = 0;
    } else if (val > 5) {
      this._score = 5;
    } else {
      this._score = val;
    }
    const solidStarCount: number = Math.floor(this._score);
    for (let i: number = 0; i < solidStarCount; i++) {
      this.stars.push(this.faStar);
    }
    if (this._score - solidStarCount >= 0.5) {
      this.stars.push(this.faStarHalfStroke);
    }
    const emptyStarCount: number = 5 - this.stars.length;
    for (let i: number = 0; i < emptyStarCount; i++) {
      this.stars.push(this.faStarEmpty);
    }
  }

  stars: IconDefinition[] = [];
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faStarEmpty = faStarEmpty;

  private _score: number = 0;
}
