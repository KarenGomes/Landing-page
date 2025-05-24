import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

registerLocaleData(localePt, 'pt-BR');

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
