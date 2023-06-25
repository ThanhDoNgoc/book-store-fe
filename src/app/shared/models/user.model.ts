export default interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: Role;
}

export enum Role {
  Admin = 'admin',
  Customer = 'customer',
}
