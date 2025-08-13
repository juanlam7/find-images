import { Component, computed, inject, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ImagesService } from '../../../core/services/images.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detail',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  imagesService = inject(ImagesService);

  id = toSignal<string>(
    inject(ActivatedRoute).params.pipe(map((params) => params['id']))
  );

  photoById = toSignal(this.imagesService.getImageById(this.id() ?? ''));
}
