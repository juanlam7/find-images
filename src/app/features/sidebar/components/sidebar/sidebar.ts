import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemePickerComponent } from '../../../../shared/components/theme';
import { LanguageService } from '../../../../core/services/translation.services';
import { I18N_TOKEN } from '../../../../core/tokens/i18n.token';
import { Locales } from '../../../../core/types';
import { ImagesService } from '../../../../core/services/images.service';

interface MenuOption {
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule,
    ThemePickerComponent,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  imagesServices = inject(ImagesService);
  readonly i18n = inject(I18N_TOKEN);
  readonly languageService = inject(LanguageService);
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update((prev) => !prev);
  }

  menuOptions: MenuOption[] = [
    {
      icon: 'light_mode',
      label: 'Home',
      subLabel: 'Popular images',
      route: '/home',
    },
    {
      icon: 'light_mode',
      label: 'Favorites',
      subLabel: 'Favorites images',
      route: '/favorites',
    },
  ];

  locales = Locales;

  switchLanguage(lang: Locales) {
    this.languageService.switchLanguage(lang);
  }
}
