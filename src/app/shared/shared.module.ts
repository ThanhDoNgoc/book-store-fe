import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { FormsModule } from '@angular/forms';
import { BookService } from './services/book.services';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockService } from './mock/mock-service';

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
  ],
  exports: [
    HeaderComponent,
    ProductFilterComponent,
  ],
})
export class SharedModule { }
