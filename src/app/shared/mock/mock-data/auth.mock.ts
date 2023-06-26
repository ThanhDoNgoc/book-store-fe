import { Permission } from '../../enum/permission.enum';

const auth = [
  {
    username: 'customer',
    email: 'customer@customer',
    role: 'customer',
    permission: [],
    token: 'customer_token',
  },
  {
    username: 'admin',
    email: 'admin@admin',
    role: 'admin',
    permission: [Permission.Book_Permission, Permission.User_Permission],
    token: 'admin_token',
  },
];

export default auth;
