import { Category } from './book.model';

export default interface BookDetail {
  id?: number;
  title: string;
  price: number;
  category: Category;
  inStock: number;
  description: string;
}
