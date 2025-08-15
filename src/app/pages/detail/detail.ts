import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '@core/services/images.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-detail',
  imports: [MatCardModule, MatButtonModule, DatePipe, DecimalPipe],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  imagesService = inject(ImagesService);

  id = toSignal<string>(
    inject(ActivatedRoute).params.pipe(map((params) => params['id']))
  );

  photoById = toSignal(this.imagesService.getImageById(this.id() ?? ''));

  downloadImage(downloadUrl: string): void {
    window.open(downloadUrl, '_blank');
  }

  openUnsplash(htmlUrl: string): void {
    window.open(htmlUrl, '_blank');
  }

  openPortfolio(portfolioUrl: string): void {
    window.open(portfolioUrl, '_blank');
  }
}
