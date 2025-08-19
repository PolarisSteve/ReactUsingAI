import { Address } from './address';
import { PhoneContact } from './phone';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  middleInitial?: string;
  age: number;
  addresses: Address[];
  phoneContacts: PhoneContact[];
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  middleInitial?: string;
  age: number;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {
  id: string;
}
