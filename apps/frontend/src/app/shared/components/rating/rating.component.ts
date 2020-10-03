import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {

  @Input() rating;

  get formatted() {
    if (!this.rating) {
      return null;
    }
    return Math.floor(this.rating * 100) / 100
  }

}
