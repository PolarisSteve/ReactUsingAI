import { User, CreateUserDto, UpdateUserDto } from '@/types/user';
import { Address, CreateAddressDto, UpdateAddressDto } from '@/types/address';
import { PhoneContact, CreatePhoneContactDto, UpdatePhoneContactDto, PhoneType } from '@/types/phone';

class UserService {
  private users: User[] = [];
  private nextUserId = 1;
  private nextAddressId = 1;
  private nextPhoneId = 1;

  constructor() {
    this.initializeData();
  }

  private generateId(type: 'user' | 'address' | 'phone'): string {
    switch (type) {
      case 'user':
        return `user_${this.nextUserId++}`;
      case 'address':
        return `addr_${this.nextAddressId++}`;
      case 'phone':
        return `phone_${this.nextPhoneId++}`;
    }
  }

  private initializeData(): void {
    // Create 10 sample users
    const sampleUsers: CreateUserDto[] = [
      { firstName: 'John', lastName: 'Doe', middleInitial: 'M', age: 30 },
      { firstName: 'Jane', lastName: 'Smith', age: 28 },
      { firstName: 'Michael', lastName: 'Johnson', middleInitial: 'R', age: 35 },
      { firstName: 'Emily', lastName: 'Davis', age: 26 },
      { firstName: 'David', lastName: 'Wilson', middleInitial: 'L', age: 42 },
      { firstName: 'Sarah', lastName: 'Brown', age: 31 },
      { firstName: 'Robert', lastName: 'Jones', middleInitial: 'T', age: 38 },
      { firstName: 'Lisa', lastName: 'Garcia', age: 29 },
      { firstName: 'William', lastName: 'Martinez', middleInitial: 'A', age: 33 },
      { firstName: 'Jennifer', lastName: 'Anderson', age: 27 }
    ];

    sampleUsers.forEach(userData => {
      const user = this.createUser(userData);
      
      // Add 1-2 addresses per user
      const addressCount = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < addressCount; i++) {
        this.addAddress(user.id, this.generateSampleAddress(i === 0));
      }

      // Add 1-3 phone numbers per user
      const phoneCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < phoneCount; i++) {
        this.addPhoneContact(user.id, this.generateSamplePhone(i));
      }
    });
  }

  private generateSampleAddress(isPreferred: boolean): CreateAddressDto {
    const addresses = [
      '123 Main St', '456 Oak Ave', '789 Pine Rd', '321 Elm St', '654 Maple Dr',
      '987 Cedar Ln', '147 Birch Way', '258 Spruce Ct', '369 Willow St', '741 Ash Blvd'
    ];
    const cities = [
      'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
      'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'
    ];
    const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA'];
    const zips = ['10001', '90210', '60601', '77001', '85001', '19101', '78201', '92101', '75201', '95101'];

    const index = Math.floor(Math.random() * addresses.length);
    return {
      address: addresses[index],
      city: cities[index],
      state: states[index],
      zip: zips[index],
      isPreferred
    };
  }

  private generateSamplePhone(index: number): CreatePhoneContactDto {
    const areaCodes = ['212', '310', '312', '713', '602', '215', '210', '619', '214', '408'];
    const types: PhoneType[] = ['Primary', 'Secondary', 'Fax'];
    
    return {
      areaCode: areaCodes[Math.floor(Math.random() * areaCodes.length)],
      prefix: String(Math.floor(Math.random() * 900) + 100),
      suffix: String(Math.floor(Math.random() * 9000) + 1000),
      extension: index === 0 ? undefined : String(Math.floor(Math.random() * 9999) + 1000),
      type: types[index % types.length]
    };
  }

  // User CRUD operations
  getAllUsers(): User[] {
    return [...this.users];
  }

  getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  createUser(userData: CreateUserDto): User {
    const user: User = {
      id: this.generateId('user'),
      ...userData,
      addresses: [],
      phoneContacts: []
    };
    this.users.push(user);
    return user;
  }

  updateUser(userData: UpdateUserDto): User | undefined {
    const userIndex = this.users.findIndex(user => user.id === userData.id);
    if (userIndex === -1) return undefined;

    this.users[userIndex] = { ...this.users[userIndex], ...userData };
    return this.users[userIndex];
  }

  deleteUser(id: string): boolean {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;

    this.users.splice(userIndex, 1);
    return true;
  }

  // Address CRUD operations
  addAddress(userId: string, addressData: CreateAddressDto): Address | undefined {
    const user = this.getUserById(userId);
    if (!user) return undefined;

    // If this address is marked as preferred, unmark all other addresses
    if (addressData.isPreferred) {
      user.addresses.forEach(addr => addr.isPreferred = false);
    }

    const address: Address = {
      id: this.generateId('address'),
      ...addressData,
      userId
    };

    user.addresses.push(address);
    return address;
  }

  updateAddress(addressData: UpdateAddressDto): Address | undefined {
    const user = this.users.find(u => 
      u.addresses.some(addr => addr.id === addressData.id)
    );
    if (!user) return undefined;

    const addressIndex = user.addresses.findIndex(addr => addr.id === addressData.id);
    if (addressIndex === -1) return undefined;

    // If this address is being marked as preferred, unmark all other addresses
    if (addressData.isPreferred) {
      user.addresses.forEach(addr => addr.isPreferred = false);
    }

    user.addresses[addressIndex] = { ...user.addresses[addressIndex], ...addressData };
    return user.addresses[addressIndex];
  }

  deleteAddress(addressId: string): boolean {
    const user = this.users.find(u => 
      u.addresses.some(addr => addr.id === addressId)
    );
    if (!user) return false;

    const addressIndex = user.addresses.findIndex(addr => addr.id === addressId);
    if (addressIndex === -1) return false;

    user.addresses.splice(addressIndex, 1);
    return true;
  }

  // Phone Contact CRUD operations
  addPhoneContact(userId: string, phoneData: CreatePhoneContactDto): PhoneContact | undefined {
    const user = this.getUserById(userId);
    if (!user) return undefined;

    const phoneContact: PhoneContact = {
      id: this.generateId('phone'),
      ...phoneData,
      userId
    };

    user.phoneContacts.push(phoneContact);
    return phoneContact;
  }

  updatePhoneContact(phoneData: UpdatePhoneContactDto): PhoneContact | undefined {
    const user = this.users.find(u => 
      u.phoneContacts.some(phone => phone.id === phoneData.id)
    );
    if (!user) return undefined;

    const phoneIndex = user.phoneContacts.findIndex(phone => phone.id === phoneData.id);
    if (phoneIndex === -1) return undefined;

    user.phoneContacts[phoneIndex] = { ...user.phoneContacts[phoneIndex], ...phoneData };
    return user.phoneContacts[phoneIndex];
  }

  deletePhoneContact(phoneId: string): boolean {
    const user = this.users.find(u => 
      u.phoneContacts.some(phone => phone.id === phoneId)
    );
    if (!user) return false;

    const phoneIndex = user.phoneContacts.findIndex(phone => phone.id === phoneId);
    if (phoneIndex === -1) return false;

    user.phoneContacts.splice(phoneIndex, 1);
    return true;
  }
}

// Export a singleton instance
export const userService = new UserService();
