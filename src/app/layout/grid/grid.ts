import { Component, input, signal } from '@angular/core';
import { UnsplashPhoto } from '../../core/types/images.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-grid',
  imports: [RouterLink],
  template: `
    <div class="grid-container">
      @for (item of photos(); track item.id) {
      <img
        class="grid-item"
        [src]="item.urls.small"
        [routerLink]="redirectRoute() ? [redirectRoute(), item.id] : null"
      />
      }
    </div>
  `,
  styleUrl: './grid.css',
})
export class Grid {
  photos = input.required<UnsplashPhoto[]>();
  redirectRoute = input<string>();
}
