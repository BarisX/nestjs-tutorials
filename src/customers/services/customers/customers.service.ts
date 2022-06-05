import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/types/Customer';
@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      name: 'John',
      isActive: true,
    },
    {
      id: 2,
      name: 'Jane',
      isActive: false,
    },
    {
      id: 3,
      name: 'Jack',
      isActive: true,
    },
  ];

  findCustomerById(id: number) {
    return this.customers.find((user) => user.id === id);
  }
  createCustomer(customerDto: CreateCustomerDto) {
    this.customers.push(customerDto);
    console.log(customerDto);
  }

  getCustomers() {
    return this.customers;
  }
}
