import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookDetailComponent } from './book-detail.component';
import { BookService } from '../../../../shared/services/book.services';
import { of } from 'rxjs';
import { Category } from '../../../../shared/models/book.model';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let bookService: BookService;
  let matDialogRef: MatDialogRef<BookDetailComponent>;

  const data = {
    id: 1,
    title: 'Book 1',
    price: 10,
    category: Category.Drama,
  };

  const book = {
    title: 'Book 1',
    price: 10,
    quantity: 5,
    description: 'Description',
    category: Category.Drama,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookDetailComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close']),
        },
        {
          provide: BookService,
          useValue: {
            getBookDetail: (id: number) => of(book),
            putBook: () => of({}),
            postBook: () => of({}),
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: data,
        },
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
    matDialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init bookDetail', () => {
    expect(component.bookDetail).toEqual(book);
  });

  it('should update book and close', () => {
    spyOn(bookService, 'putBook').and.returnValue(of({}));

    component.submitForm();

    expect(bookService.putBook).toHaveBeenCalledWith(component.bookDetail);
    expect(matDialogRef.close).toHaveBeenCalled();
  });

  it('should create book and close', () => {
    spyOn(bookService, 'postBook').and.returnValue(of({}));

    component.book = undefined;
    component.submitForm();

    expect(bookService.postBook).toHaveBeenCalledWith(component.bookDetail);
    expect(matDialogRef.close).toHaveBeenCalled();
  });
});
