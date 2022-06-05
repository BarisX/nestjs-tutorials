import { Controller, Inject, Get, Param, HttpException, HttpStatus, UseInterceptors, ClassSerializerInterceptor, ParseIntPipe, UseFilters } from '@nestjs/common';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UsersService } from 'src/users/services/users/users.service';
import { User, SerializedUser } from 'src/users/types/index';

@Controller('users')
export class UsersController {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService,
    ) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('')
    getUsers() {
        return this.userService.findAll();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':username')
    getUser(@Param("username") username: string) {
        const user = this.userService.findOne(username)
        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
        return new SerializedUser(user);
    }

    
    @UseInterceptors(ClassSerializerInterceptor)
    @UseFilters(HttpExceptionFilter)
    @Get("id/:id")
    getById(@Param("id", ParseIntPipe) id: number) {
        const user = this.userService.getUserById(id);
        if (!user) {
            throw new UserNotFoundException('User not found', HttpStatus.BAD_REQUEST);
        }
        return new SerializedUser(user);
    }   
}
