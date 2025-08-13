import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SearchImagesResult, UnsplashPhoto } from '../types/images.interface';
import { calculateTotalPages } from '../utils/calculateTotalPages';

const BASE_API = environment.apiUrl;

const PHOTOS_KEY = 'photos';

const loadFromLocalStorage = () => {
  const photosFromLocalStorage = localStorage.getItem(PHOTOS_KEY) ?? '{}';
  const photos = JSON.parse(photosFromLocalStorage);

  return photos;
};

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private readonly http = inject(HttpClient);

  photos = signal<UnsplashPhoto[]>([]);

  private photosPage = signal(1);
  private totalPhotosPage = signal(1);

  isLoadingPhotos = signal(false);
  searchQuery = signal('');

  searchHistory = signal<Record<string, UnsplashPhoto[]>>(
    loadFromLocalStorage()
  );
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.getImages();
  }

  savePhotosToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(PHOTOS_KEY, historyString);
  });

  getImages(): void {
    if (this.isLoadingPhotos()) return;

    this.isLoadingPhotos.set(true);

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
        this.isLoadingPhotos.set(false);
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

        this.searchHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: resp.body?.results ?? [],
        }));
      });
  }

  resetToDefaultValues() {
    this.photos.set([]);
    this.photosPage.set(1);
    this.totalPhotosPage.set(1);
    this.searchQuery.set('');
  }

  getHistoryPhotos(query: string): UnsplashPhoto[] {
    return this.searchHistory()[query] ?? [];
  }
}
