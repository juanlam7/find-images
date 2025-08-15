import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteBtn } from './favorite-btn';

describe('FavoriteBtn', () => {
  let component: FavoriteBtn;
  let fixture: ComponentFixture<FavoriteBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
