import { Component, input, signal } from '@angular/core';
import { UnsplashPhoto } from '../../core/types/images.interface';
import { RouterLink } from '@angular/router';
import { FavoriteBtn } from '../../shared/components/favorite-btn/favorite-btn';

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
