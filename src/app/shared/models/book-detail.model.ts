import { Category } from './book.model';

export default interface BookDetail {
  _id?: number;
  title: string;
  price: number;
  image: string;
  category: Category;
  quantity: number;
  description: string;
}
