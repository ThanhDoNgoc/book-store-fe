import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockService } from './mock/mock-service';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [
    HeaderComponent,
    ProductFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(MockService, { delay: 200 }),
    RouterModule,
    
  ],
  exports: [
    HeaderComponent,
    ProductFilterComponent,
  ],
  providers: [
    AuthGuard
  ]
})
export class SharedModule { }
