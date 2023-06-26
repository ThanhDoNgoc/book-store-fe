import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailComponent } from './book-detail.component';
import { BookService } from '../../shared/services/book.services';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import BookDetail from '../../shared/models/book-detail.model';
import { Category } from '../../shared/models/book.model';
import { HttpClient } from '@angular/common/http';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let bookService: BookService;
  let activatedRoute: ActivatedRoute;

  const book: BookDetail = {
    id: 1,
    title: 'title',
    price: 1,
    category: Category.Comedy,
    inStock: 12,
    description: 'description',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookDetailComponent],
      providers: [
        {
          provide: BookService,
          useValue: {
            getBookDetail: () => of(book),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
          },
        },
        HttpClient
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init get book detail', () => {
    spyOn(bookService, 'getBookDetail').and.callThrough();

    component.ngOnInit();

    expect(bookService.getBookDetail).toHaveBeenCalledWith(1);
    expect(component.book).toEqual(book);
  });
});
