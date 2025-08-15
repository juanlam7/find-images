import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ImagesService } from '../../core/services/images.service';
import { LanguageService } from '../../core/services/translation.services';
import { I18N_TOKEN } from '../../core/tokens/i18n.token';
import { Locales } from '../../core/types';
import { LAST_SEARCH_QUERY_KEY } from '../../core/utils/constants';
import { setToLocalStorage } from '../../core/utils/setToLocalStorage';
import { ThemePickerComponent } from '../../shared/components/theme/theme';

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
  readonly router = inject(Router);
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

  searchByKey(searchKey: string) {
    setToLocalStorage({ lastQuery: searchKey }, LAST_SEARCH_QUERY_KEY);
    this.imagesServices.historyKeyQuery.set(searchKey);
    this.router.navigate(['/home']);
  }
}
