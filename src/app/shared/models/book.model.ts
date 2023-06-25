export default interface Book {
  id: number;
  title: string;
  price: number;
  category: Category;
}

export enum Category {
  Drama = 'drama',
  Sport = 'sport',
  Comedy = 'comedy',
}
