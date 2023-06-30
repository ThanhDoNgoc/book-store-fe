const url = {
  book: 'http://localhost:3000/api',
};
export const environment = {
  production: true,
  book: {
    getBooks: `${url.book}/`,
    getBookDetail: `${url.book}/:id`,
    createBook: `${url.book}/`,
    updateBook: `${url.book}/`,
  },

  auth: {
    login: 'api/auth',
    register: 'api/auth',
  },

  user: {
    getUsers: 'api/users',
  },
};
