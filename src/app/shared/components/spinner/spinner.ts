import { Component, inject, input } from '@angular/core';
import { SpinnerService } from '../../../core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  imports: [],
  template: ` @if (isLoading()) {
    <section class="spinner-overlay">
      @if (spinnerText().length > 0) {
      <p class="spinner-text">
        {{ spinnerText() }}
      </p>
      }
      <div class="spinner" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </section>
    }`,
  styleUrl: './spinner.css',
})
export default class Spinner {
  spinnerText = input<string>('');

  private readonly spinnerSvc = inject(SpinnerService);
  isLoading = this.spinnerSvc.isLoading;
}
