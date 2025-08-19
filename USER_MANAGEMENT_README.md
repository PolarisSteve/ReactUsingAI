# User Management Application

A comprehensive React/Next.js application for managing users, their addresses, and phone contacts. Built with TypeScript and styled with Tailwind CSS.

## Features

### User Management
- ✅ **Add, Edit, Delete Users** - Complete CRUD operations for user profiles
- ✅ **Required Fields**: First Name, Last Name, Age
- ✅ **Optional Field**: Middle Initial
- ✅ **Form Validation** - Client-side validation with error messages

### Address Management
- ✅ **Multiple Addresses per User** - Users can have zero to many addresses
- ✅ **Address Fields**: Address, City, State, ZIP Code
- ✅ **Preferred Address** - Only one address can be marked as preferred
- ✅ **CRUD Operations** - Add, edit, delete addresses independently
- ✅ **Data Grid Interface** - Clean list view with inline editing capabilities

### Phone Contact Management
- ✅ **Multiple Phone Numbers per User** - Users can have zero to many phone contacts
- ✅ **Structured Phone Fields**: Area Code, Prefix, Suffix, Optional Extension
- ✅ **Phone Types**: Primary, Secondary, Fax
- ✅ **CRUD Operations** - Add, edit, delete phone contacts independently
- ✅ **Formatted Display** - Phone numbers displayed in (XXX) XXX-XXXX format

### Navigation & UI
- ✅ **Navigation Menu** - Clean header navigation with Home and Users pages
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Modern UI** - Built with Tailwind CSS for professional appearance
- ✅ **Tabbed Interface** - Organized user details with tabs for info, addresses, and phones

## Technical Implementation

### Architecture
- **Framework**: Next.js 15.4.7 with React 19.1.0
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS 4.0
- **State Management**: React hooks (useState, useEffect)
- **Data Service**: In-memory service with full CRUD operations

### Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx           # Home page
│   └── users/
│       └── page.tsx       # Users management page
├── components/
│   ├── Navigation.tsx     # Header navigation component
│   ├── UserList.tsx       # User list table component
│   ├── UserForm.tsx       # User add/edit form
│   ├── UserDetail.tsx     # User detail view with tabs
│   ├── AddressManager.tsx # Address CRUD component
│   └── PhoneManager.tsx   # Phone contact CRUD component
├── services/
│   └── userService.ts     # Data service with sample data
└── types/
    ├── user.ts           # User type definitions
    ├── address.ts        # Address type definitions
    └── phone.ts          # Phone contact type definitions
```

### Data Models

#### User Model
```typescript
interface User {
  id: string;
  firstName: string;        // Required
  lastName: string;         // Required
  middleInitial?: string;   // Optional
  age: number;             // Required
  addresses: Address[];
  phoneContacts: PhoneContact[];
}
```

#### Address Model
```typescript
interface Address {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  isPreferred: boolean;    // Only one can be true per user
  userId: string;
}
```

#### Phone Contact Model
```typescript
interface PhoneContact {
  id: string;
  areaCode: string;        // 3 digits
  prefix: string;          // 3 digits
  suffix: string;          // 4 digits
  extension?: string;      // Optional
  type: 'Primary' | 'Secondary' | 'Fax';
  userId: string;
}
```

### Sample Data
The application comes pre-loaded with:
- **10 sample users** with varied demographic data
- **1-2 addresses per user** with realistic address information
- **1-3 phone numbers per user** with different types and extensions

## Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager

### Installation
1. **Clone the repository**
   ```bash
   cd c:\trialReact\newreactapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   Navigate to [http://localhost:3001](http://localhost:3001) in your browser

### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## Usage Guide

### Managing Users
1. **View Users**: Navigate to the Users page to see all users in a table format
2. **Add User**: Click "Add User" button and fill in the required information
3. **Edit User**: Click "Edit" next to any user in the list
4. **View Details**: Click "View" to see comprehensive user information
5. **Delete User**: Click "Delete" and confirm to remove a user

### Managing Addresses
1. **View Addresses**: In user detail view, click the "Addresses" tab
2. **Add Address**: Click "Add Address" and fill in address information
3. **Set Preferred**: Check the "Set as preferred address" checkbox
4. **Edit Address**: Click "Edit" next to any address
5. **Delete Address**: Click "Delete" and confirm to remove an address

### Managing Phone Contacts
1. **View Phone Numbers**: In user detail view, click the "Phone Numbers" tab
2. **Add Phone**: Click "Add Phone Number" and enter phone details
3. **Choose Type**: Select Primary, Secondary, or Fax from the dropdown
4. **Add Extension**: Optionally add an extension number
5. **Edit Phone**: Click "Edit" next to any phone number
6. **Delete Phone**: Click "Delete" and confirm to remove a phone number

## API Reference

### UserService Methods

#### User Operations
- `getAllUsers()` - Get all users
- `getUserById(id)` - Get user by ID
- `createUser(userData)` - Create new user
- `updateUser(userData)` - Update existing user
- `deleteUser(id)` - Delete user

#### Address Operations
- `addAddress(userId, addressData)` - Add address to user
- `updateAddress(addressData)` - Update existing address
- `deleteAddress(addressId)` - Delete address

#### Phone Contact Operations
- `addPhoneContact(userId, phoneData)` - Add phone contact to user
- `updatePhoneContact(phoneData)` - Update existing phone contact
- `deletePhoneContact(phoneId)` - Delete phone contact

## Form Validation

### User Form Validation
- **First Name**: Required, cannot be empty
- **Last Name**: Required, cannot be empty
- **Middle Initial**: Optional, maximum 1 character
- **Age**: Required, must be between 1 and 120

### Address Form Validation
- **Address**: Required, cannot be empty
- **City**: Required, cannot be empty
- **State**: Required, cannot be empty
- **ZIP Code**: Required, must match format XXXXX or XXXXX-XXXX

### Phone Form Validation
- **Area Code**: Required, must be exactly 3 digits
- **Prefix**: Required, must be exactly 3 digits
- **Suffix**: Required, must be exactly 4 digits
- **Extension**: Optional, must contain only digits if provided

## Technologies Used

- **Next.js 15.4.7** - React framework with app router
- **React 19.1.0** - JavaScript library for building user interfaces
- **TypeScript 5.x** - Typed superset of JavaScript
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Node.js** - JavaScript runtime environment

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the development team.
