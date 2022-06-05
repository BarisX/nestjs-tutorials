import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsNumberString,
  ValidateNested,
	IsNotEmptyObject,
} from 'class-validator';
import { CreateAddressDto } from './CreateAddress.dto';

export class CreateCustomerDto {
  @IsNumberString()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  isActive: boolean;

	@IsNotEmptyObject()
  @ValidateNested()
	@Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
