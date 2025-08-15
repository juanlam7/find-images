import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UnsplashPhoto } from '@core/types';
import { FavoriteBtn } from '../favorite-btn/favorite-btn';

@Component({
  selector: 'app-grid',
  imports: [RouterLink, FavoriteBtn],
  template: `
    <div class="grid-container">
      @for (item of photos(); track item.id) {
      <figure class="grid-item">
        <app-favorite-btn [photo]="item" />
        <img
          [src]="item.urls.small"
          [routerLink]="redirectRoute() ? [redirectRoute(), item.id] : null"
        />
      </figure>
      }
    </div>
  `,
  styleUrl: './grid.css',
})
export class Grid {
  photos = input.required<UnsplashPhoto[]>();
  redirectRoute = input<string>();
}
