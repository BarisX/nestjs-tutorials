import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { User, SerializedUser } from 'src/users/types/index';

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 1,
            username: 'john',
            password: 'changeme',
        },
        {
            id: 2,
            username: 'chris',
            password: 'secret',
        },
        {
            id: 3,
            username: 'maria',
            password: 'guess',
        },
    ];

    create(user: User) {
        this.users.push(user);
    }

    findAll(): User[] {
        // return this.users.map((user) => plainToClass(SerializedUser, user))
        return this.users.map((user) => new SerializedUser(user));
    }

    findOne(username: string): User {
        return this.users.find(user => user.username === username);
    }

    getUserById(id: number) {
        return this.users.find(user => user.id === id);
    }
}
