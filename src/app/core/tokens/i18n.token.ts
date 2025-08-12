import { InjectionToken, Signal } from '@angular/core';
import { IAppLabels } from '../types';

export const I18N_TOKEN = new InjectionToken<Signal<IAppLabels>>('I18n token');
