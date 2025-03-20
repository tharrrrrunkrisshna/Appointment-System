import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 3000,  // Toast disappears after 3s
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        progressBar: true,  // Show progress bar
        newestOnTop:true
      })),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
  importProvidersFrom(HttpClientModule)]
};

