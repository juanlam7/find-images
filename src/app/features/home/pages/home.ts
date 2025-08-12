import { Component, inject } from '@angular/core';
import { ImagesService } from '../../../core/services/images.service';
import { Grid } from '../../../layout/grid/grid';
import { SearchField } from '../components/searcher/searcher';
import { ScrollNearEndDirective } from '../directives/scroll-near-end.directive';
import { SpinnerService } from '../../../core/services/spinner.service';

@Component({
  selector: 'app-home',
  imports: [Grid, SearchField, ScrollNearEndDirective],
  template: ` <article
    appScrollNearEnd
    [scrollThreshold]="300"
    (nearEnd)="spinnerService.isLoading() ? '' : loadMore()"
    class="home-wrapper hide-scrollbar"
  >
    <app-search-field />
    <app-grid [photos]="imagesServices.photos()" />
  </article>`,
  styleUrl: './home.css',
})
export class Home {
  imagesServices = inject(ImagesService);
  spinnerService = inject(SpinnerService);

  loadMore() {
    this.imagesServices.getImages();
  }
}
