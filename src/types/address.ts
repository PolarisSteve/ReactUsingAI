export interface Address {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  isPreferred: boolean;
  userId: string;
}

export interface CreateAddressDto {
  address: string;
  city: string;
  state: string;
  zip: string;
  isPreferred: boolean;
}

export interface UpdateAddressDto extends Partial<CreateAddressDto> {
  id: string;
}
