import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchConfig } from '../../types/searcher.interface';

@Component({
  selector: 'app-search-field',
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './searcher.html',
})
export class SearchField implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  config = input<SearchConfig>({
    placeholder: 'Search...',
    debounceTime: 500,
    minSearchLength: 2,
    appearance: 'fill',
    showClearButton: true,
  });

  initialValue = input<string>('');
  disabled = input<boolean>(false);
  // TODO: this isLoading will be set as true when the API call start, and then set it to false
  isLoading = input<boolean>(false);

  searchChange = output<string>();
  searchClear = output<void>();

  searchValue = signal<string>('');

  searchControl = new FormControl('');

  constructor() {
    effect(() => {
      const initial = this.initialValue();
      if (initial && initial !== this.searchValue()) {
        this.searchControl.setValue(initial);
        this.searchValue.set(initial);
      }
    });

    effect(() => {
      const isDisabled = this.disabled();
      if (isDisabled) {
        this.searchControl.disable();
      } else {
        this.searchControl.enable();
      }
    });
  }

  ngOnInit(): void {
    this.setupSearchSubscription();
  }

  private setupSearchSubscription(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.config().debounceTime || 500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
        const searchTerm = (value || '').trim();
        this.searchValue.set(searchTerm);

        const minLength = this.config().minSearchLength || 0;

        if (searchTerm.length === 0) {
          this.searchClear.emit();
        } else if (searchTerm.length >= minLength) {
          this.searchChange.emit(searchTerm);
        }
      });
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.searchValue.set('');
  }

  setValue(value: string): void {
    this.searchControl.setValue(value);
  }
}
