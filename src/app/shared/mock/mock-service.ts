import { InMemoryDbService } from 'angular-in-memory-web-api';
import books from './mock-data/book.mock';
import book from './mock-data/book-detail.mock';
import auth from './mock-data/auth.mock';
import users from './mock-data/user.mock';

export class MockService implements InMemoryDbService {
  createDb() {
    return { books, book, auth, users };
  }
}
