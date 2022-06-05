import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ValidateCustomerAccountMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    console.log('Hello, world. I am inside ValidateCustomerAccountMiddleware!');
    const { validAccount } = req.headers;
    if (validAccount) {
      next();
    } else {
      res.status(401).send({ error: 'Account is invalid' });
    }
  }
}
