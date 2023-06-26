import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookComponent } from './book.component';
import { BookService } from '../../../shared/services/book.services';
import { of } from 'rxjs';
import Book, { Category } from '../../../shared/models/book.model';
import { MatDialog } from '@angular/material/dialog';
import Filter from '../../../shared/models/filter.model';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let bookService: BookService;
  let matDialog: MatDialog;

  const books = [
    { id: 1, title: 'test book 1', price: 10, category: Category.Comedy },
    { id: 2, title: 'test book 2', price: 15, category: Category.Sport },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookComponent],
      providers: [
        {
          provide: BookService,
          useValue: {
            getBook: (filter: Filter) => of(books),
          },
        },
        {
          provide: MatDialog,
          useValue: { open: jasmine.createSpy('open') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
    matDialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init book', () => {
    expect(component.dataSource.data).toEqual(books);
  });

  it('should getBooks when catch filter change', () => {
    spyOn(component, 'getBooks');

    const filter = {
      optionName: 'Category',
      selectOptions: ['Fiction'],
      searchKey: 'example',
    };
    component.onFilter(filter);

    expect(component.getBooks).toHaveBeenCalledWith(component.filter);
  });

  it('should getBooks when catch load page', () => {
    spyOn(component, 'getBooks');

    const page = { pageIndex: 2 };
    component.loadPage(page);

    expect(component.getBooks).toHaveBeenCalledWith(component.filter);
  });

  it('should open dialog and parse data when edit', () => {
    spyOn(component, 'openDialog');

    const book: Book = {
      id: 1,
      title: 'test',
      price: 10,
      category: Category.Drama,
    };
    component.editBook(book);

    expect(component.openDialog).toHaveBeenCalledWith(book);
  });

  it('should open dialog and without data when create', () => {
    spyOn(component, 'openDialog');

    component.createBook();

    expect(component.openDialog).toHaveBeenCalled();
  });

  it('should open dialog', () => {
    component.openDialog();

    expect(matDialog.open).toHaveBeenCalled();
  });
});
