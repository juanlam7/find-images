import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SearchImagesResult, UnsplashPhoto } from '../types/images.interface';
import { calculateTotalPages } from '../utils/calculateTotalPages';

const BASE_API = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private readonly http = inject(HttpClient);

  photos = signal<UnsplashPhoto[]>([]);

  private photosPage = signal(1);
  private totalPhotosPage = signal(1);
  searchQuery = signal('');

  constructor() {
    this.getImages();
  }

  getImages(): void {
    if (this.totalPhotosPage() < this.photosPage()) return;

    this.http
      .get<UnsplashPhoto[]>(BASE_API + '/photos', {
        observe: 'response',
        params: {
          per_page: 10,
          page: this.photosPage(),
        },
      })
      .subscribe((resp) => {
        this.photos.update((currentPhotos) => [
          ...currentPhotos,
          ...(resp.body ?? []),
        ]);

        const totalPhotosHeader = parseInt(resp.headers.get('X-Total') ?? '0');

        this.totalPhotosPage.set(calculateTotalPages(totalPhotosHeader, 10));
        this.photosPage.update((page) => page + 1);
      });
  }

  getImageById(id: string): Observable<UnsplashPhoto> {
    return this.http.get<UnsplashPhoto>(`${BASE_API}/photos/${id}`);
  }

  getSearchImages(query: string): void {
    this.searchQuery.set(query);
    if (this.totalPhotosPage() < this.photosPage()) return;

    this.http
      .get<SearchImagesResult>(BASE_API + '/search/photos', {
        observe: 'response',
        params: {
          per_page: 10,
          page: this.photosPage(),
          query,
        },
      })
      .subscribe((resp) => {
        this.photos.update((currentPhotos) => [
          ...currentPhotos,
          ...(resp.body?.results ?? []),
        ]);

        const totalPhotosHeader = parseInt(resp.headers.get('X-Total') ?? '0');

        this.totalPhotosPage.set(calculateTotalPages(totalPhotosHeader, 10));
        this.photosPage.update((page) => page + 1);
      });
  }

  resetToDefaultValues() {
    this.photos.set([]);
    this.photosPage.set(1);
    this.totalPhotosPage.set(1);
    this.searchQuery.set('');
  }
}
