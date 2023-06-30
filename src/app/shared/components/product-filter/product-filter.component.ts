import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  @Input() optionName?: string;
  @Input() optionList?: string[];
  @Input() canSearch: Boolean = true;
  @Output() filter: EventEmitter<{
    selectOptions: string[];
    search: string;
    optionName: string
  }> = new EventEmitter();
  
  selectOptions: string[] = [];
  search: string = '';

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.emitFilter();
  }

  toggleOption(option: string): void {
    if (this.selectOptions.includes(option)) {
      this.selectOptions = this.selectOptions.filter((item) => item !== option);
    } else {
      this.selectOptions.push(option);
    }
  }

  emitFilter(): void {
    const filter: any = {
      search: this.search,
      optionName: this.optionName,
      selectOptions: this.selectOptions,
    };
    this.filter.emit(filter);
  }
}
