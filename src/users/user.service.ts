import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserService {
  getHello(): string {
    return 'Hello World!';
  }
}
