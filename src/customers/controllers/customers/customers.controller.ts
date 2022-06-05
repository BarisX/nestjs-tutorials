import {
  Controller,
  Get,
  HttpException,
  Param,
	Body,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CustomersService } from 'src/customers/services/customers/customers.service';
import { Request, Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { create } from 'domain';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':id')
  getCustomers(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log(typeof id); // int
    const customer = this.customersService.findCustomerById(id);
    if (customer) {
      res.send(customer);
    } else {
      res.status(400).send({
        message: 'Customer not found',
      });
    }
  }

  @Get('/search/:id')
  searchCustomerById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) {
      return customer;
    } else {
      throw new HttpException('Customer not found', 404);
    }
  }

  @Get("")
  getAllCustomers(){
    return this.customersService.getCustomers()
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
		return this.customersService.createCustomer(createCustomerDto);

	}
}
