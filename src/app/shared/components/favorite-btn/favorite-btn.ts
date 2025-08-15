import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FavoriteService } from '../../../core/services/favorite.service';
import { UnsplashPhoto } from '../../../core/types/images.interface';

@Component({
  selector: 'app-favorite-btn',
  imports: [MatIcon, MatButtonModule, CommonModule],
  template: `
    <button
      (click)="isFavorite() ? deleteFavoriteBtn() : AddFavoriteBtn()"
      class="btn-container"
      mat-icon-button
      [ngStyle]="{
        backgroundColor: isFavorite()
          ? 'rgba(244, 63, 94, 1)'
          : 'rgba(255, 255, 255, 1)',
        color: isFavorite() ? 'white' : 'black',
      }"
      matTooltip="Toggle favorite"
    >
      <mat-icon aria-hidden="false" aria-label="icon favorite">{{
        isFavorite() ? 'favorite' : 'favorite_border'
      }}</mat-icon>
    </button>
  `,
  styleUrl: './favorite-btn.css',
})
export class FavoriteBtn {
  photo = input.required<UnsplashPhoto>();
  favoriteService = inject(FavoriteService);

  isFavorite = computed(() => {
    return this.favoriteService
      .favoriteList()
      .some((item) => item.id === this.photo().id);
  });

  AddFavoriteBtn() {
    this.favoriteService.addFavorite(this.photo());
  }
  deleteFavoriteBtn() {
    this.favoriteService.deleteFavorite(this.photo().id);
  }
}
