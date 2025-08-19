export type PhoneType = 'Primary' | 'Secondary' | 'Fax';

export interface PhoneContact {
  id: string;
  areaCode: string;
  prefix: string;
  suffix: string;
  extension?: string;
  type: PhoneType;
  userId: string;
}

export interface CreatePhoneContactDto {
  areaCode: string;
  prefix: string;
  suffix: string;
  extension?: string;
  type: PhoneType;
}

export interface UpdatePhoneContactDto extends Partial<CreatePhoneContactDto> {
  id: string;
}

export const PHONE_TYPES: PhoneType[] = ['Primary', 'Secondary', 'Fax'];
