import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BookModule } from './book/book.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from 'angular-auth-oidc-client';
import { AdminModule } from './admin/admin.module';
import { environment } from './shared/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthModule.forRoot({
      config: environment.auth,
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    BookModule,
    AdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
