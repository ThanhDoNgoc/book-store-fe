import {
  InMemoryDbService,
  ResponseOptions,
  RequestInfo,
} from 'angular-in-memory-web-api';
import books from './mock-data/book.mock';
import book from './mock-data/book-detail.mock';
import auth from './mock-data/auth.mock';
import users from './mock-data/user.mock';
import success from './mock-data/success';
import { Observable } from 'rxjs';

export class MockService implements InMemoryDbService {
  createDb() {
    return { books, book, auth, users, success };
  }

  post(reqInfo: RequestInfo): Observable<any> | undefined {
    if (reqInfo.collectionName === 'auth') {
      const { email } = reqInfo.utils.getJsonBody(reqInfo.req);

      const auth = reqInfo.collection as any[];
      const user = auth.find((u) => u.email === email);

      if (user) {
        const response: ResponseOptions = {
          body: user,
          status: 200,
        };
        console.log(response);
        return reqInfo.utils.createResponse$(() => response);
      } else {
        const response: ResponseOptions = {
          body: { error: 'Invalid email or password' },
          status: 401,
        };

        return reqInfo.utils.createResponse$(() => response);
      }
    }

    return undefined;
  }
}
