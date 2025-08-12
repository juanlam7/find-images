import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent } from 'rxjs';

@Directive({
  selector: '[appScrollNearEnd]',
  standalone: true,
})
export class ScrollNearEndDirective {
  scrollThreshold = input<number>(100);
  nearEnd = output<void>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);

  constructor() {
    afterNextRender(() => {
      const element = this.elementRef.nativeElement;

      fromEvent(element, 'scroll')
        .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.checkElementScroll(element);
        });
    });
  }

  private checkElementScroll(element: HTMLElement): void {
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    if (scrollHeight - (scrollTop + clientHeight) <= this.scrollThreshold()) {
      this.nearEnd.emit();
    }
  }
}
