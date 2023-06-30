export default interface Book {
  _id: string;
  title: string;
  price: number;
  image: string;
  category: Category;
}

export enum Category {
  Drama = 'drama',
  Sport = 'sport',
  Comedy = 'comedy',
}
