import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MultiSelectModule } from 'primeng/multiselect';

// Toastr configuration
const toastrConfig = {
  timeOut: 3000,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),

    provideHttpClient(),
    provideToastr(toastrConfig) // Use provideToastr to configure ToastrModule
  ],
};
