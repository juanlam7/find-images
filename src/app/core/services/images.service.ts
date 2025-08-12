import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UnsplashPhoto } from '../types/images.interface';

const BASE_API = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private readonly http = inject(HttpClient);

  photos = signal<UnsplashPhoto[]>([]);

  private photosPage = signal(1);
  private totalPhotosPage = signal(1);

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

        this.totalPhotosPage.set(totalPhotosHeader);
        this.photosPage.update((page) => page + 1);
      });
  }

  getImageById(id: string): Observable<UnsplashPhoto> {
    return this.http.get<UnsplashPhoto>(`${BASE_API}/photos/${id}`);
  }
}
