import { Component, input, signal } from '@angular/core';
import { UnsplashPhoto } from '../../core/types/images.interface';

@Component({
  selector: 'app-grid',
  imports: [],
  template: `
    <div class="grid-container">
      @for (item of photos(); track item.id) {
      <img
        class="grid-item"
        [src]="item.urls.small"
      />
      }
    </div>
  `,
  styleUrl: './grid.css',
})
export class Grid {
  photos = input.required<UnsplashPhoto[]>();
}
