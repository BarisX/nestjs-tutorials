import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';

@Module({
  imports: [],
  providers: [{
    provide: "USER_SERVICE",
    useClass: UsersService,
  }],
  controllers: [UsersController]
})
export class UsersModule {}
