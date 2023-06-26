import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { BookService } from '../../shared/services/book.services';
import { of } from 'rxjs';
import Book, { Category } from '../../shared/models/book.model';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let bookService: BookService;

  const book: Book[] = [
    {
      id: 1,
      title: 'Book 1',
      price: 10,
      category: Category.Comedy,
    },
    {
      id: 2,
      title: 'Book 2',
      price: 20,
      category: Category.Drama,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
      providers: [
        {
          provide: BookService,
          useValue: {
            getBook: () => of(book),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init books', () => {
    spyOn(bookService, 'getBook').and.callThrough();
    component.ngOnInit();
    expect(bookService.getBook).toHaveBeenCalledWith(component.filter);
    expect(component.books).toEqual(book);
  });

  it('should update filter get book when filter change', () => {
    spyOn(bookService, 'getBook').and.callThrough();
    const filter: any = {
      optionName: 'Category',
      selectOptions: ['drama'],
      searchKey: 'Book',
    };
    component.onFilter(filter);
    expect(bookService.getBook).toHaveBeenCalled();
    expect(component.books).toEqual(book);
  });

  it('should next page and get book', () => {
    spyOn(bookService, 'getBook').and.callThrough();
    component.nextPage();
    expect(component.filter.page).toEqual(2);
    expect(bookService.getBook).toHaveBeenCalledWith(component.filter);
    expect(component.books).toEqual(book);
  });

  it('should previous page and get book', () => {
    spyOn(bookService, 'getBook').and.callThrough();
    component.previousPage();
    expect(component.filter.page).toEqual(0);
    expect(bookService.getBook).toHaveBeenCalledWith(component.filter);
    expect(component.books).toEqual(book);
  });

  it('should get books by page', () => {
    spyOn(bookService, 'getBook').and.callThrough();
    const page = 3;
    component.toPage(page);
    expect(component.filter.page).toEqual(page);
    expect(bookService.getBook).toHaveBeenCalledWith(component.filter);
    expect(component.books).toEqual(book);
  });
});