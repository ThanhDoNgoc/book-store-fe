import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFilterComponent } from './product-filter.component';

describe('ProductFilterComponent', () => {
  let component: ProductFilterComponent;
  let fixture: ComponentFixture<ProductFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filter when onSubmit is called', () => {
    spyOn(component.filter, 'emit');

    component.searchKey = 'example';
    component.selectOptions = ['option1', 'option2'];
    component.optionName = 'exampleOption';

    component.onSubmit();

    expect(component.filter.emit).toHaveBeenCalledWith({
      searchKey: 'example',
      optionName: 'exampleOption',
      selectOptions: ['option1', 'option2'],
    });
  });

  it('should toggle option when toggleOption is called', () => {
    component.selectOptions = ['option1'];

    component.toggleOption('option1');
    expect(component.selectOptions).toEqual([]);

    component.toggleOption('option2');
    expect(component.selectOptions).toEqual(['option2']);
  });
});